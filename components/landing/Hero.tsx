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
        <p className="mx-auto mt-4 max-w-md font-serif text-[26px] font-bold leading-[1.25] tracking-tight text-fg sm:text-[34px]">
          연구는 혼자.
          <br />
          저녁은 <span className="text-primary">같이.</span>
        </p>

        <p className="mx-auto mt-6 max-w-md text-[17px] leading-relaxed text-fg-muted sm:text-[19px]">
          KAIST 석박사·졸업자 전용 오프라인 파티.
          <br className="hidden sm:block" />
          학번 대신 연구 주제, 스펙 대신 케미로.
        </p>

        <div className="mx-auto mt-10 flex max-w-xs items-center justify-center gap-3 text-[13px] text-fg-subtle">
          <span className="h-px w-8 bg-border-strong" />
          <span className="tracking-[0.3em]">SINCE · KAIST</span>
          <span className="h-px w-8 bg-border-strong" />
        </div>
      </div>
    </section>
  );
}
