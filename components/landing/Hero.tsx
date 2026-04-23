import Image from "next/image";
import { FaviconMark } from "./FaviconMark";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-16 pb-14 sm:pt-24 sm:pb-20">
      <div className="container-page animate-fade-up text-center">
        <div className="mb-8 flex justify-center">
          <Image
            src="/heart-transparent.png"
            alt=""
            width={240}
            height={240}
            priority
            className="h-[120px] w-auto sm:h-[140px]"
            aria-hidden
          />
        </div>

        <h1 className="inline-flex items-center gap-2 sm:gap-3 font-display text-display-xl text-fg">
          <span>
            Lab<span className="text-primary">Meet</span>
          </span>
          <span aria-hidden className="translate-y-[4px] sm:translate-y-[6px]">
            <FaviconMark size={42} />
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
