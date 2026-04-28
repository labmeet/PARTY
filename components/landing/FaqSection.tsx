const FAQ: { q: string; a: string }[] = [
  {
    q: "참가비는 얼마인가요?",
    a: "정가는 50,000원이고 현재 참가비는 35,000원입니다. 얼리버드 1차는 5월 9일까지 15,000원 할인, 얼리버드 2차는 5월 23일까지 5,000원 할인으로 적용돼요.",
  },
  {
    q: "대전 밖에서도 가능한가요?",
    a: "1차 네트워킹 파티는 KAIST 구성원만 받아요. 이후 차수에는 조금 더 넓혀갈 수도 있습니다.",
  },
  {
    q: "익명 보장되나요?",
    a: "같은 랩 사람과는 최대한 겹치지 않게 도와드려요. 따로 피하고 싶은 사람이 있으면 신청서에 조용히 적어주세요. 운영진이 확인해서 반영해드릴게요.",
  },
  {
    q: "정확한 프로그램은 무엇인가요?",
    a: "분위기에 따라 유연하게 진행하지만, 처음 오시는 분들도 부담 없이 어울릴 수 있도록 운영팀이 자연스럽게 분위기를 도와드릴 예정입니다.",
  },
  {
    q: "또 열리나요?",
    a: "네, 잘 되면 또 열립니다! 이번엔 조용조용 내향인 버전, 다음 버전은 DJ를 동반한 외향인 버전 네트워킹 파티를 기획 중입니다.",
  },
];

export function FaqSection() {
  return (
    <section className="container-page py-12 sm:py-16">
      <div className="mb-8 text-center">
        <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.25em] text-primary">
          FAQ
        </p>
        <h2 className="font-serif text-[26px] font-bold leading-tight text-fg sm:text-[32px]">
          자주 묻는 것들
        </h2>
      </div>

      <div className="space-y-3">
        {FAQ.map((item) => (
          <details
            key={item.q}
            className="group card cursor-pointer p-0 transition-colors [&[open]]:border-primary/30"
          >
            <summary className="flex list-none items-center justify-between gap-4 px-6 py-5 [&::-webkit-details-marker]:hidden sm:px-7">
              <span className="flex items-center gap-3">
                <span className="font-display text-[11px] font-semibold tracking-[0.2em] text-primary">
                  Q
                </span>
                <span className="font-serif text-[16px] font-bold text-fg sm:text-[17px]">
                  {item.q}
                </span>
              </span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0 text-fg-subtle transition-transform duration-300 group-open:rotate-180 group-open:text-primary"
                aria-hidden="true"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </summary>
            <div className="px-6 pb-6 pt-1 sm:px-7">
              <div className="flex gap-3">
                <span className="font-display text-[11px] font-semibold tracking-[0.2em] text-fg-subtle">
                  A
                </span>
                <p className="flex-1 text-[14px] leading-[1.75] text-fg-muted sm:text-[14.5px]">
                  {item.a}
                </p>
              </div>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
