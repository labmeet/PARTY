"use client";

import { useRouter } from "next/navigation";

const PARTY_DATE = 29;
const MONTH = 5;
const YEAR = 2026;

const DAYS = ["일", "월", "화", "수", "목", "금", "토"];

// 2026년 5월 1일은 금요일 (5)
const FIRST_DAY = 5;
const TOTAL_DAYS = 31;

export function PartyCalendar() {
  const router = useRouter();

  const cells: (number | null)[] = [
    ...Array(FIRST_DAY).fill(null),
    ...Array.from({ length: TOTAL_DAYS }, (_, i) => i + 1),
  ];

  // 6행으로 맞추기
  while (cells.length < 42) cells.push(null);

  return (
    <section className="container-page py-12 sm:py-16">
      <div className="mb-8 text-center">
        <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.25em] text-primary">
          Party Date
        </p>
        <h2 className="font-serif text-display-md text-fg">
          {YEAR}년 {MONTH}월 파티
        </h2>
        <p className="mt-2 text-[14px] text-fg-muted">
          날짜를 클릭해 신청서를 작성하세요
        </p>
      </div>

      <div className="card overflow-hidden p-0">
        {/* 요일 헤더 */}
        <div className="grid grid-cols-7 border-b border-border">
          {DAYS.map((d, i) => (
            <div
              key={d}
              className={`py-3 text-center text-[12px] font-semibold tracking-widest ${
                i === 0 ? "text-red-400" : i === 6 ? "text-blue-400" : "text-fg-subtle"
              }`}
            >
              {d}
            </div>
          ))}
        </div>

        {/* 날짜 그리드 */}
        <div className="grid grid-cols-7">
          {cells.map((day, idx) => {
            const isParty = day === PARTY_DATE;
            const isSun = idx % 7 === 0;
            const isSat = idx % 7 === 6;
            const isNull = day === null;

            return (
              <div
                key={idx}
                onClick={() => isParty && router.push("/apply/female")}
                className={`relative flex min-h-[60px] sm:min-h-[72px] flex-col items-center justify-start pt-2.5 border-b border-r border-border transition-all
                  ${isParty
                    ? "cursor-pointer bg-primary/10 hover:bg-primary/20"
                    : ""}
                  ${idx % 7 === 6 ? "border-r-0" : ""}
                  ${Math.floor(idx / 7) === 5 ? "border-b-0" : ""}
                `}
              >
                {day && (
                  <>
                    <span
                      className={`text-[13px] sm:text-[15px] font-medium leading-none
                        ${isParty
                          ? "flex h-7 w-7 items-center justify-center rounded-full bg-primary font-bold text-bg-base"
                          : isSun
                          ? "text-red-400"
                          : isSat
                          ? "text-blue-400"
                          : "text-fg"}
                      `}
                    >
                      {day}
                    </span>
                    {isParty && (
                      <div className="mt-1.5 flex flex-col items-center gap-0.5">
                        <span className="text-[10px] font-bold text-primary leading-none">
                          PARTY
                        </span>
                        <span className="text-[9px] text-primary/70 leading-none">
                          신청하기 →
                        </span>
                      </div>
                    )}
                  </>
                )}

                {/* 파티 날짜 글로우 */}
                {isParty && (
                  <div className="pointer-events-none absolute inset-0 rounded-none shadow-[inset_0_0_20px_rgba(80,230,160,0.15)]" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 파티 날짜 안내 */}
      <div className="mt-4 flex items-center justify-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-primary animate-pulse" />
        <p className="text-[13px] text-fg-muted">
          <span className="font-semibold text-primary">{YEAR}년 {MONTH}월 {PARTY_DATE}일 (금)</span>에 파티가 열립니다
        </p>
      </div>
    </section>
  );
}
