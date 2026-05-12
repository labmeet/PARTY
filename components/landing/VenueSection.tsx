import Image from "next/image";

export function VenueSection() {
  return (
    <section className="container-page py-12 sm:py-16">
      <div className="overflow-hidden rounded-[32px] border border-border bg-bg-card shadow-card">
        <div className="px-6 pb-8 pt-9 sm:px-10 sm:pb-10 sm:pt-10">
          <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-primary">
            Venue
          </p>
          <h2 className="mt-2 font-serif text-[26px] font-bold leading-tight text-fg sm:text-[32px]">
            오시는 길
          </h2>

          <div className="mt-6 flex flex-col gap-3 text-[14px] leading-relaxed text-fg-muted sm:text-[14.5px]">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 text-primary">📍</span>
              <div>
                <span className="font-semibold text-fg">스타팅포인트</span>
                <span className="ml-2 text-fg-subtle">어은동 잇마이타이 옆</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="mt-0.5 text-primary">🗺</span>
              <div className="flex flex-wrap gap-x-3 gap-y-1">
                <a
                  href="https://map.kakao.com/link/search/스타팅포인트"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#FEE500] underline underline-offset-2"
                >
                  카카오맵
                </a>
                <span className="text-fg-subtle">·</span>
                <a
                  href="https://map.naver.com/v5/search/스타팅포인트"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#03C75A] underline underline-offset-2"
                >
                  네이버맵
                </a>
                <span className="text-fg-subtle">에서 스타팅포인트 검색</span>
              </div>
            </div>
          </div>

          <div className="mt-7 grid grid-cols-2 gap-3">
            <div className="relative aspect-square overflow-hidden rounded-2xl">
              <Image
                src="/venue-1.jpg"
                alt="스타팅포인트 내부"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, 400px"
              />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-2xl">
              <Image
                src="/venue-2.jpg"
                alt="스타팅포인트 내부"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, 400px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
