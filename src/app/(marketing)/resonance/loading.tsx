import { Container } from "@/components/site/Container";

export default function ResonanceLoading() {
  return (
    <>
      <section className="flex min-h-[60vh] items-center border-b border-rule">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-6 h-4 w-40 animate-pulse rounded bg-rule" />
            <div className="mx-auto h-16 w-64 animate-pulse rounded bg-rule md:h-20 md:w-80" />
            <div className="mx-auto mt-8 h-24 w-full max-w-2xl animate-pulse rounded bg-rule" />
          </div>
        </Container>
      </section>

      <section className="section">
        <Container>
          <div className="mx-auto max-w-3xl">
            <div className="mx-auto mb-6 h-4 w-32 animate-pulse rounded bg-rule" />
            <div className="mx-auto h-10 w-56 animate-pulse rounded bg-rule" />
            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="aspect-[4/3] animate-pulse rounded-lg bg-rule"
                />
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
