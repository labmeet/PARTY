export function QuoteCard() {
  return (
    <section className="container-page py-10 sm:py-14">
      <figure className="relative mx-auto overflow-hidden rounded-[28px] border border-border bg-bg-card px-8 py-14 text-center shadow-card sm:py-16">
        <div
          className="pointer-events-none absolute inset-0 -z-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 50% 0%, rgba(255, 95, 85, 0.10) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 50% 100%, rgba(20, 210, 120, 0.10) 0%, transparent 65%)",
          }}
          aria-hidden="true"
        />
        <p className="relative mb-5 text-[11px] font-medium uppercase tracking-[0.3em] text-pop">
          PRIVATE PARTY · KAIST
        </p>
        <blockquote className="relative font-serif text-[24px] font-bold leading-[1.4] tracking-tight text-fg sm:text-[32px]">
          카이스트 최초 네트워킹 파티
          <br />
          <span className="text-primary">5월 29일 랩미에서</span>
          <br />
          프라이빗하게 만납니다.
        </blockquote>
        <figcaption className="relative mt-7 flex items-center justify-center gap-3 text-[11px] tracking-[0.25em] text-fg-subtle">
          <span className="h-px w-8 bg-border-strong" aria-hidden="true" />
          <span className="font-display uppercase">LABMEET · 2026.05.29</span>
          <span className="h-px w-8 bg-border-strong" aria-hidden="true" />
        </figcaption>
      </figure>
    </section>
  );
}
