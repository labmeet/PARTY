export function DressCodeSection() {
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

        <div className="relative">
          <div className="text-center">
            <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.25em] text-primary">
              Dress Code
            </p>
            <h2 className="font-serif text-[26px] font-bold leading-tight text-fg sm:text-[32px]">
              옷은 어떻게 입고 가요?
            </h2>
          </div>

          <div className="mt-6 rounded-[26px] border border-border-strong bg-bg-elevated/40 px-5 py-6 sm:px-7 sm:py-7">
            <div className="flex items-center justify-center">
              <span className="inline-flex h-9 items-center rounded-full border border-primary/30 bg-primary/15 px-5 text-[12px] font-semibold tracking-[0.18em] text-primary">
                BUSINESS CASUAL
              </span>
            </div>

            <p className="mt-5 text-center text-[14px] leading-[1.8] text-fg-muted sm:text-[14.5px]">
              드레스코드는 비즈니스 캐주얼이에요.
              <br />
              너무 격식 차리지 않으면서도 단정하게, 첫 인상에 신경 써 주세요.
            </p>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5">
              <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-[12px] text-fg">
                셔츠
              </span>
              <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-[12px] text-fg">
                니트
              </span>
              <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-[12px] text-fg">
                슬랙스
              </span>
              <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-[12px] text-fg">
                원피스
              </span>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}
