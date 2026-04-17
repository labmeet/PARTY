const POINTS = [
  {
    emoji: "🚫",
    title: "같은 랩실 매칭은 없어요",
    body:
      "신청할 때 소속 연구실을 꼭 적어주세요. 같은 랩 사람과는 연결되지 않아요. 월요일 아침, 어색하게 마주칠 일 없어요.",
  },
  {
    emoji: "👻",
    title: "그 사람 올까봐 걱정이면, 알아서 걸러드려요",
    body:
      "신청서에 조용히 적어주세요. 이름 안 써도 돼요. 힌트만 주셔도 저희가 알아서 처리해요. 그 사람도 당신이 여기 왔는지 몰라요.",
  },
  {
    emoji: "🔒",
    title: "익명 100% 지켜드려요",
    body:
      "누가 신청했는지, 누가 왔는지, 누구 번호 땄는지. 아무도 몰라요. 저희도 말 안 해요. 행사 끝나면 개인정보 전부 지워드려요.",
  },
];

export function ReassuranceSection() {
  return (
    <section className="container-page py-12 sm:py-16">
      <div className="mb-8 text-center">
        <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.25em] text-primary">
          Safe Points
        </p>
        <h2 className="font-serif text-[22px] font-bold leading-[1.35] text-fg sm:text-[28px]">
          걱정되는 거? 저희도 대학원생입니다.
          <br />
          알고 있습니다.
        </h2>
        <p className="mx-auto mt-4 max-w-sm text-[14px] leading-relaxed text-fg-muted">
          이번 금요일,
          <br className="sm:hidden" />
          {" "}둘만 만나는 자리 만들어드립니다.
        </p>
      </div>

      <div className="space-y-4">
        {POINTS.map((p) => (
          <article
            key={p.title}
            className="card flex items-start gap-4 transition-transform duration-200 hover:-translate-y-0.5 sm:gap-5"
          >
            <span
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-pop/10 text-[1.6rem] leading-none"
              aria-hidden="true"
            >
              {p.emoji}
            </span>
            <div className="flex-1 min-w-0">
              <h3 className="font-serif text-[16px] font-bold text-fg sm:text-[17px]">
                {p.title}
              </h3>
              <p className="mt-1.5 text-[13.5px] leading-[1.7] text-fg-muted sm:text-[14px]">
                {p.body}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
