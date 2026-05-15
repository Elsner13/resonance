import { Container } from "@/components/site/Container";

export default function MarketingLoading() {
  return (
    <section className="flex min-h-[60vh] items-center">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto mb-6 h-4 w-48 animate-pulse rounded bg-rule" />
          <div className="mx-auto h-16 w-72 animate-pulse rounded bg-rule md:h-20 md:w-96" />
          <div className="mx-auto mt-8 h-20 w-full max-w-2xl animate-pulse rounded bg-rule" />
        </div>
      </Container>
    </section>
  );
}
