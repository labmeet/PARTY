import Image from "next/image";

const STEPS = [
  {
    step: "Step 1",
    title: "소개 작성",
    description: "각자 자리 안내 후 프로필 카드와 첫인상 키워드를 가볍게 작성합니다.",
    visual: "profile",
  },
  {
    step: "Step 2",
    title: "로테이션 프리토킹",
    description: "하이볼과 치즈 플레이트를 즐기며, 15분씩 자리를 바꿔 이야기합니다.",
    visual: "highball",
  },
  {
    step: "Step 3",
    title: "랩미 QR타임",
    description: "QR코드로 호감 가는 이성에게 마음을 전하고, 익명으로 시그널을 남길 수 있어요.",
    visual: "qr",
  },
  {
    step: "Step 4",
    title: "파티 종료",
    description: "마무리 인사 후 자유롭게 남아 대화하거나 애프터 신청으로 이어집니다.",
    visual: "cheese",
  },
] as const;

export function ProgramSection() {
  return (
    <section className="container-page pt-3 pb-3 sm:pt-4 sm:pb-4">
      <div className="relative">
        <article className="card relative overflow-hidden px-5 py-7 sm:px-8 sm:py-9">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.25em] text-primary">
                Program
              </p>
              <h2 className="font-serif text-[26px] font-bold leading-tight text-fg sm:text-[32px]">
                프로그램 소개
              </h2>
            </div>
            <p className="hidden font-serif text-[42px] italic leading-none text-white/20 sm:block">
              Program
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {STEPS.map((item) => (
              <article
                key={item.step}
                className="rounded-[24px] border border-border bg-bg-elevated/40 p-4"
              >
                <div className="inline-flex rounded-full border border-border-strong px-3 py-1 text-[11px] italic text-fg-muted">
                  {item.step}
                </div>
                <h3 className="mt-3 font-serif text-[18px] font-bold text-fg sm:text-[19px]">
                  {item.title}
                </h3>
                <p className="mt-2 min-h-[66px] text-[14px] leading-[1.75] text-fg-muted sm:text-[14.5px]">
                  {item.description}
                </p>
                <ProgramVisual visual={item.visual} />
              </article>
            ))}
          </div>

          <div className="mt-7 rounded-[24px] border border-border bg-bg-base/45 px-5 py-5 text-center">
            <p className="text-[14px] leading-[1.8] text-fg-muted sm:text-[14.5px]">
              하이볼&치즈를 제공해드리는 스페셜 다이닝을 즐기고,
              <br />
              시간별로 테이블 로테이션을 진행하여 다양한 사람들과
              <br className="hidden sm:block" />
              편하게 대화할 수 있는 환경을 만들어 드립니다.
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}

function ProgramVisual({ visual }: { visual: (typeof STEPS)[number]["visual"] }) {
  if (visual === "highball") {
    return (
      <div className="relative mt-4 aspect-[1.28] overflow-hidden rounded-[20px] border border-border">
        <Image
          src="/highball.jpg"
          alt="하이볼과 프리토킹 이미지"
          fill
          sizes="(max-width: 640px) 90vw, 280px"
          className="object-cover"
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(10,10,10,0.08) 0%, rgba(10,10,10,0.32) 100%)" }}
          aria-hidden="true"
        />
      </div>
    );
  }

  if (visual === "cheese") {
    return (
      <div className="relative mt-4 aspect-[1.28] overflow-hidden rounded-[20px] border border-border">
        <Image
          src="/cheese-plate.jpg"
          alt="치즈 플레이트 이미지"
          fill
          sizes="(max-width: 640px) 90vw, 280px"
          className="object-cover"
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(10,10,10,0.06) 0%, rgba(10,10,10,0.28) 100%)" }}
          aria-hidden="true"
        />
      </div>
    );
  }

  if (visual === "qr") {
    return (
      <div className="relative mt-4 aspect-[1.28] overflow-hidden rounded-[20px] border border-border bg-[radial-gradient(circle_at_top,_rgba(182,233,204,0.2),_transparent_50%),linear-gradient(180deg,_rgba(255,255,255,0.05),_rgba(255,255,255,0.02))]">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="grid grid-cols-5 gap-1 rounded-[18px] border border-white/10 bg-black/30 p-3">
            {Array.from({ length: 25 }).map((_, i) => (
              <span
                key={i}
                className={`h-3.5 w-3.5 rounded-[2px] ${i % 2 === 0 || i < 5 || i > 19 ? "bg-primary/90" : "bg-white/12"}`}
              />
            ))}
          </div>
        </div>
        <div className="absolute bottom-3 left-3 rounded-full border border-white/10 bg-black/25 px-3 py-1 text-[10px] font-semibold tracking-[0.2em] text-white/85">
          QR TIME
        </div>
      </div>
    );
  }

  return (
    <div className="relative mt-4 aspect-[1.28] overflow-hidden rounded-[20px] border border-border bg-[linear-gradient(135deg,_rgba(182,233,204,0.16),_rgba(255,255,255,0.04))]">
      <div className="absolute inset-0 p-4">
        <div className="rounded-[18px] border border-white/10 bg-black/25 p-4">
          <div className="mb-3 h-2.5 w-20 rounded-full bg-white/15" />
          <div className="space-y-2">
            <div className="h-2.5 w-full rounded-full bg-white/10" />
            <div className="h-2.5 w-4/5 rounded-full bg-white/10" />
            <div className="h-2.5 w-3/5 rounded-full bg-white/10" />
          </div>
          <div className="mt-4 flex gap-2">
            <span className="rounded-full bg-primary/20 px-2 py-1 text-[10px] text-primary">MBTI</span>
            <span className="rounded-full bg-white/8 px-2 py-1 text-[10px] text-fg-muted">Interest</span>
          </div>
        </div>
      </div>
      <div className="absolute bottom-3 left-3 rounded-full border border-white/10 bg-black/25 px-3 py-1 text-[10px] font-semibold tracking-[0.2em] text-white/85">
        PROFILE CARD
      </div>
    </div>
  );
}
