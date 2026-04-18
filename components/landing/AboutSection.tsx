import type { ReactNode } from "react";

const BULLETS: {
  k: string;
  title: string;
  body: ReactNode;
}[] = [
  {
    k: "01",
    title: "이게 뭔가요?",
    body: "KAIST 구성원들이 만들어나가는 오프라인 파티. 솔로신가요? 소개팅 해달라고 하기도 기 빨리시나요? 세미나실에서 눈만 마주치던 그 사람, 눈길 가는 옆 랩 사람, 조용히 랩미에서 만나봐요!",
  },
  {
    k: "02",
    title: "누가 와요?",
    body: "카이스트 석박사 재학생과 졸업생만 와요! 학회 기간에 소개팅 펑크 낸 사람, 대전 산다고 소개팅 거절당한 사람, 대학원생이라고 거절당한 사람, 여기 다 모입니다.",
  },
  {
    k: "03",
    title: "어떻게 해요?",
    body: (
      <>
        폼을 작성하고 신청해주시면, 저희가 알잘딱으로 자리 채워서 재미있게,{" "}
        <span className="font-semibold text-fg">기 안 빨리게</span> 자리를
        만들어드려요. 대신 누가 올지는 알려드릴 수 없어요. 현장에서 직접
        확인해주세요.
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
          솔직하게 말하면
          <br />
          이런 자리입니다
        </h2>
      </div>

      <div className="space-y-4">
        {BULLETS.map((b, i) => (
          <article key={b.k} className="card relative">
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
