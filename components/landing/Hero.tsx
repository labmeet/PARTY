import { Logo } from "./Logo";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-20 pb-14 sm:pt-28 sm:pb-20">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 30%, rgba(127,212,164,0.10) 0%, transparent 65%)",
        }}
        aria-hidden="true"
      />
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
        <p className="mt-3 font-serif text-2xl font-medium tracking-tight text-fg/90 sm:text-3xl">
          랩 밖에서 만나는, 진중한 인연
        </p>

        <p className="mx-auto mt-6 max-w-md text-[15px] leading-relaxed text-fg-muted">
          연구에 몰두하는 당신을 위한, KAIST 석박사·졸업자 전용
          <br className="hidden sm:block" />
          오프라인 파티 & 매칭 커뮤니티
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
