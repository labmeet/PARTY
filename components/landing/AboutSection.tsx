const BULLETS = [
  {
    k: "01",
    title: "이게 뭔가요?",
    body:
      "KAIST 내부에서만 열리는 오프라인 파티입니다. 평소에 옆 랩 예쁘다고, 잘생겼다고 생각하던 사람들이 조용히 여기로 옵니다.",
  },
  {
    k: "02",
    title: "누가 와요?",
    body:
      "KAIST ONLY. 연구한다는 이유로 소개팅 못 받던 사람, 타지 와서 차인 사람 — 여기 다 있습니다.",
  },
  {
    k: "03",
    title: "어떻게 해요?",
    body:
      "신청 → 검토 → 초대 메일 → 파티. 오기 전까지 누가 오는지 모릅니다. 당일 현장에서 직접 확인하세요.",
  },
];

export function AboutSection() {
  return (
    <section className="container-page py-12 sm:py-16">
      <div className="mb-8 text-center">
        <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.25em] text-primary">
          About LabMeet
        </p>
        <h2 className="font-serif text-display-md text-fg">
          솔직하게 말하면 <br className="sm:hidden" />이런 자리입니다
        </h2>
      </div>

      <div className="space-y-3">
        {BULLETS.map((b) => (
          <article key={b.k} className="card flex gap-5">
            <span className="font-display text-2xl leading-none text-primary/90">
              {b.k}
            </span>
            <div className="flex-1">
              <h3 className="font-serif text-lg font-semibold text-fg">
                {b.title}
              </h3>
              <p className="mt-1.5 text-[14px] leading-relaxed text-fg-muted">
                {b.body}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
