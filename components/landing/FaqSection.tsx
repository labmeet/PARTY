const FAQ: { q: string; a: string }[] = [
  {
    q: "환불은요?",
    a: "35,000원 / 얼리버드 4월 30일까지. 결제는 승인 후 안내드려요. 사정이 생기면 행사 7일 전까지 연락주세요 — 전액 환불해드립니다.",
  },
  {
    q: "타대생도 가능한가요?",
    a: "1차 랩미는 KAIST 구성원만 받아요. 2차부터 조금씩 늘려갈 예정입니다.",
  },
  {
    q: "익명 보장되나요?",
    a: "같은 랩 사람은 안 오게 해드려요. 따로 거르고 싶은 사람 있으면 신청서에 조용히 적어주세요. 저희가 알아서 반영해드려요.",
  },
  {
    q: "정확한 프로그램이 뭐에요?",
    a: "비밀이에요… 당일에만 알려드려요. 기 안 빨리게 해드릴게요, 근데.",
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
