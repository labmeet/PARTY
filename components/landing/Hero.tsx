import { Logo } from "./Logo";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-20 pb-14 sm:pt-28 sm:pb-20">
      <div className="container-page animate-fade-up text-center">
        <div className="mb-6 flex justify-center">
          <Logo size={56} />
        </div>

        <div className="mb-5 flex justify-center">
          <span className="pill">KAIST · 석박사 전용</span>
        </div>

        <h1 className="font-display text-display-xl text-fg">
          Lab<span className="text-primary">Meet</span>
        </h1>
        <p className="mx-auto mt-4 max-w-lg font-serif text-2xl font-bold leading-snug tracking-tight text-fg sm:text-[28px]">
          논문보다 어려운 게 있다면,
          <br className="sm:hidden" /> 그건 인연 찾기
        </p>

        <p className="mx-auto mt-6 max-w-md text-[15px] leading-relaxed text-fg-muted">
          KAIST 석박사·졸업자 전용 오프라인 파티.
          <br className="hidden sm:block" />
          학번 대신 연구실, 스펙 대신 대화로.
        </p>

        <div className="mx-auto mt-10 flex max-w-xs items-center justify-center gap-3 text-xs text-fg-subtle">
          <span className="h-px w-10 bg-border-strong" />
          <span className="tracking-[0.3em]">SINCE · KAIST</span>
          <span className="h-px w-10 bg-border-strong" />
        </div>
      </div>
    </section>
  );
}
