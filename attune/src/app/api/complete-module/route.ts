import { auth, currentUser, clerkClient } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { modules } from '@/lib/modules'

export async function POST(req: Request) {
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json()
  const { slug } = body as { slug: string }

  if (!slug || !modules.find(m => m.slug === slug)) {
    return NextResponse.json({ error: 'Invalid module slug' }, { status: 400 })
  }

  const user = await currentUser()
  const existing = (user?.publicMetadata?.completedModules as string[]) ?? []

  if (existing.includes(slug)) {
    return NextResponse.json({ completedModules: existing })
  }

  const updated = [...existing, slug]

  const client = await clerkClient()
  await client.users.updateUserMetadata(userId, {
    publicMetadata: { completedModules: updated },
  })

  return NextResponse.json({ completedModules: updated })
}
