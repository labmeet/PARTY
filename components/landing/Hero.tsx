import { Logo } from "./Logo";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-20 pb-14 sm:pt-28 sm:pb-20">
      <div className="container-page animate-fade-up text-center">
        <div className="mb-6 flex justify-center">
          <span className="pill">KAIST ONLY</span>
        </div>

        <h1 className="relative inline-block font-display text-display-xl text-fg">
          Lab<span className="text-primary">Meet</span>
          <span
            aria-hidden
            className="pointer-events-none absolute -right-7 -top-2 sm:-right-10 sm:-top-3"
          >
            <Logo size={18} />
          </span>
        </h1>
        <p className="mx-auto mt-4 max-w-md font-serif text-[26px] font-bold leading-[1.25] tracking-tight text-fg sm:text-[34px]">
          연구는 혼자.
          <br />
          저녁은 <span className="text-primary">같이.</span>
        </p>

        <p className="mx-auto mt-6 max-w-md text-[17px] leading-relaxed text-fg-muted sm:text-[19px]">
          KAIST 대학원생 전용 오프라인 파티.
          <br className="hidden sm:block" />
          학번 대신 연구 주제, 스펙 대신 케미로.
        </p>
      </div>
    </section>
  );
}
