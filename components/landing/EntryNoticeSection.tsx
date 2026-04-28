export function EntryNoticeSection() {
  return (
    <section className="container-page py-12 sm:py-16">
      <article className="overflow-hidden rounded-[32px] border border-[#b88a4d]/60 bg-[#050505] shadow-[0_28px_70px_-36px_rgba(0,0,0,0.75)]">
        <div className="px-6 pb-8 pt-9 text-center sm:px-8 sm:pb-10 sm:pt-10">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#b88a4d]/40 bg-[#1b140b] text-[#d6a15d]">
            <svg
              viewBox="0 0 24 24"
              width="28"
              height="28"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
              <path d="M12 9v4" />
              <path d="M12 17h.01" />
            </svg>
          </div>

          <p className="mt-5 text-[11px] font-medium uppercase tracking-[0.25em] text-[#d6a15d]">
            Entry Notice
          </p>
          <h2 className="mt-2 font-serif text-[26px] font-bold leading-tight text-[#d6a15d] sm:text-[32px]">
            입장 안내
          </h2>

          <div className="mt-6 rounded-[28px] border border-[#b88a4d]/75 px-5 py-7 sm:px-8 sm:py-8">
            <p className="text-[14px] leading-[1.85] text-[#f2e7d7] sm:text-[14.5px]">
              행사 시작 15분 전부터 신분증 확인 후 입장을 도와드립니다.
              <br />
              (주민등록증, 운전면허증, 여권 지참 필수)
            </p>
            <p className="mt-5 font-serif text-[18px] font-bold text-[#d6a15d] sm:text-[19px]">
              신분증 미지참 시 참여가 제한됩니다.
            </p>
          </div>
        </div>
      </article>
    </section>
  );
}
