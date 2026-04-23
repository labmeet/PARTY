import Image from "next/image";
import type { ReactNode } from "react";

const BULLETS: {
  title: string;
  body: ReactNode;
}[] = [
  {
    title: "어떤 모임인가요?",
    body: (
      <>
        KAIST 구성원들이 직접 만드는 오프라인 파티입니다.
        <br />
        늘 반복되는 일상 말고, 가볍고 편하게 새로운 사람을 만날 수 있는 자리를 준비했어요.
        <br />
        부담 없이 와서 즐기고, 자연스럽게 대화가 이어지는 분위기를 만들고 싶었습니다.
      </>
    ),
  },
  {
    title: "누가 오나요?",
    body: (
      <>
        KAIST 학부생, 대학원생, 졸업생 중심으로 모입니다.
        <br />
        친구를 만들고 싶어도 좋고, 좋은 인연을 만나고 싶어도 괜찮아요 :)
      </>
    ),
  },
  {
    title: "어떻게 진행되나요?",
    body: (
      <>
        신청서를 작성하고 입금이 확인되면 참석 확정 안내를 보내드려요.
        <br />
        너무 시끄럽지 않게, 그리고 어색하지 않게 대화가 이어질 수 있도록 준비해둘게요.
        <br />
        걱정은 내려놓고 오셔도 됩니다.
      </>
    ),
  },
];

export function AboutSection() {
  return (
    <section className="container-page py-12 sm:py-16">
      <div className="mb-8 text-center">
        <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.25em] text-primary">
          About LabMeet
        </p>
        <h2 className="font-serif text-[26px] font-bold leading-tight text-fg sm:text-[34px]">
          편하게 이야기하고
          <br />
          자연스럽게 가까워지는 자리입니다
        </h2>
      </div>

      <div className="space-y-4">
        {BULLETS.map((b, i) => (
          <article key={b.title} className="card relative">
            <span
              className="absolute left-0 top-6 h-8 w-0.5 rounded-r bg-primary"
              aria-hidden="true"
            />
            <div className="mb-2 flex items-center gap-2">
              <span className="font-display text-[11px] font-semibold tracking-[0.2em] text-primary">
                Q{i + 1}
              </span>
              <span className="h-px w-4 bg-border-strong" aria-hidden="true" />
            </div>
            <h3 className="font-serif text-[18px] font-bold text-fg sm:text-[19px]">
              {b.title}
            </h3>
            <p className="mt-2 text-[14px] leading-[1.75] text-fg-muted sm:text-[14.5px]">
              {b.body}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function HospitalityShowcaseSection() {
  return (
    <section className="container-page pt-3 pb-3 sm:pt-4 sm:pb-4">
      <article className="card relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 50% 0%, rgba(182, 233, 204, 0.08) 0%, transparent 68%)",
          }}
          aria-hidden="true"
        />

        <div className="relative text-center">
          <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.25em] text-primary">
            Hospitality
          </p>
          <h3 className="font-serif text-[26px] font-bold leading-tight text-fg sm:text-[32px]">
            무제한 하이볼과 치즈 플레이트
          </h3>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="relative aspect-[0.82] overflow-hidden rounded-[22px] border border-border bg-[#2b241d]">
              <Image
                src="/highball.jpg"
                alt="하이볼 분위기 이미지"
                fill
                sizes="(max-width: 640px) 45vw, 280px"
                className="object-cover"
              />
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background: "linear-gradient(180deg, rgba(12,10,8,0.12) 0%, rgba(12,10,8,0.28) 100%)",
                }}
                aria-hidden="true"
              />
              <div className="absolute left-3 top-3 rounded-full border border-white/10 bg-black/25 px-3 py-1 text-[10px] font-semibold tracking-[0.2em] text-white/85">
                HIGHBALL
              </div>
            </div>

            <div className="relative aspect-[0.82] overflow-hidden rounded-[22px] border border-border bg-[#312519]">
              <Image
                src="/cheese-plate.jpg"
                alt="치즈 플레이트 이미지"
                fill
                sizes="(max-width: 640px) 45vw, 220px"
                className="object-cover"
              />
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background: "linear-gradient(180deg, rgba(15,10,7,0.12) 0%, rgba(15,10,7,0.32) 100%)",
                }}
                aria-hidden="true"
              />
              <div className="absolute left-3 top-3 rounded-full border border-white/10 bg-black/25 px-3 py-1 text-[10px] font-semibold tracking-[0.2em] text-white/85">
                CHEESE PLATE
              </div>
            </div>
          </div>

          <p className="mt-5 text-[14px] leading-[1.8] text-fg-muted sm:text-[14.5px]">
            맛있게 즐기기만 하세요.
            <br />
            준비는 저희가 다 해둘게요.
          </p>
        </div>
      </article>
    </section>
  );
}
