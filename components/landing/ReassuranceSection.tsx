const POINTS = [
  {
    emoji: "🚫",
    title: "같은 랩실 매칭 절대 없음",
    body:
      "신청 시 소속 연구실 입력 필수. 같은 랩 사람과는 절대 연결되지 않습니다. 월요일 아침, 눈 마주칠 일 없습니다.",
  },
  {
    emoji: "👻",
    title: "전 남친·전 여친은 알아서 걸러드림",
    body:
      "신청서에 조용히 적어주시면 됩니다. 이름 언급 안 해도 됩니다. 저희가 알아서 처리합니다. 그 사람도 당신이 여기 왔는지 모릅니다.",
  },
  {
    emoji: "🔒",
    title: "익명 절대 보장",
    body:
      "누가 신청했는지, 누가 왔는지, 누구 번호 땄는지. 아무도 모릅니다. 저희도 말 안 합니다. 행사 종료 후 개인정보 전량 폐기.",
  },
];

export function ReassuranceSection() {
  return (
    <section className="container-page py-12 sm:py-16">
      <div className="mb-8 text-center">
        <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.25em] text-primary">
          Safe Points
        </p>
        <h2 className="font-serif text-display-md text-fg">
          걱정되는 거, <br className="sm:hidden" />이미 다 해결해뒀습니다
        </h2>
      </div>

      <div className="space-y-3">
        {POINTS.map((p) => (
          <article key={p.title} className="card flex gap-5">
            <span
              className="shrink-0 select-none text-[2rem] leading-[1]"
              aria-hidden="true"
            >
              {p.emoji}
            </span>
            <div className="flex-1">
              <h3 className="font-serif text-lg font-semibold text-fg">
                {p.title}
              </h3>
              <p className="mt-1.5 text-[14px] leading-relaxed text-fg-muted">
                {p.body}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
