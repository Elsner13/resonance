import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";


async function tagKitSubscriber(email: string, firstName: string | null, kitApiKey: string, foundationsTagId: string) {
  const res = await fetch(
    `https://api.convertkit.com/v3/tags/${foundationsTagId}/subscribe`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_key: kitApiKey,
        email,
        first_name: firstName ?? undefined,
      }),
    }
  );
  if (!res.ok) {
    const text = await res.text();
    console.error(`Kit tag failed for ${email}: ${text}`);
  }
}

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;
  const kitApiKey = process.env.KIT_API_KEY!;
  const foundationsTagId = process.env.KIT_FOUNDATIONS_TAG_ID!;

  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Missing stripe-signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err: any) {
    console.error("Webhook signature verification failed:", err.message);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const email = session.customer_details?.email;
    const name = session.customer_details?.name ?? null;
    const firstName = name ? name.split(" ")[0] : null;

    if (email) {
      await tagKitSubscriber(email, firstName, kitApiKey, foundationsTagId);
      console.log(`Tagged ${email} as foundations-buyer in Kit`);
    }
  }

  return NextResponse.json({ received: true });
}
