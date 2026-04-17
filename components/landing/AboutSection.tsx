const BULLETS = [
  {
    k: "01",
    title: "랩미란?",
    body:
      "석박사 재학 혹은 졸업자 이상을 대상으로 오프라인 파티 및 만남을 운영하는 카이스트 내 팀입니다.",
  },
  {
    k: "02",
    title: "참가 자격",
    body:
      "KAIST를 포함한 국내외 대학원 석·박사 재학생 및 졸업자. 연구자의 품위와 진정성을 중시합니다.",
  },
  {
    k: "03",
    title: "진행 방식",
    body:
      "신청서 제출 → 팀 내부 검토 → 승인 안내 이메일 발송 → 오프라인 파티 초대. 허수 없는 진짜 만남.",
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
          연구실 밖에서 써내려가는 <br className="sm:hidden" />또 하나의 논문
        </h2>
      </div>

      <div className="space-y-3">
        {BULLETS.map((b) => (
          <article key={b.k} className="card flex gap-5">
            <span className="shrink-0 select-none font-display text-[2.75rem] leading-[1] tabular-nums text-primary/40">
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
