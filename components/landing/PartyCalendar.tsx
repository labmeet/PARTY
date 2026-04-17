"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const PARTY_DATE = 29;
const MONTH = 5;
const YEAR = 2026;

const DAYS = ["일", "월", "화", "수", "목", "금", "토"];
const FIRST_DAY = 5;
const TOTAL_DAYS = 31;

export function PartyCalendar() {
  const [open, setOpen] = useState(false);

  const cells: (number | null)[] = [
    ...Array(FIRST_DAY).fill(null),
    ...Array.from({ length: TOTAL_DAYS }, (_, i) => i + 1),
  ];
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
          파티 날짜를 클릭하세요
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

            return (
              <div
                key={idx}
                onClick={() => isParty && setOpen((v) => !v)}
                className={`relative flex min-h-[60px] sm:min-h-[72px] flex-col items-center justify-start pt-2.5 border-b border-r border-border transition-all
                  ${isParty ? "cursor-pointer bg-primary/10 hover:bg-primary/20" : ""}
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
                          : isSun ? "text-red-400"
                          : isSat ? "text-blue-400"
                          : "text-fg"}
                      `}
                    >
                      {day}
                    </span>
                    {isParty && (
                      <div className="mt-1.5 flex flex-col items-center gap-0.5">
                        <span className="text-[10px] font-bold text-primary leading-none">PARTY</span>
                        <span className="text-[9px] text-primary/70 leading-none">
                          {open ? "닫기 ↑" : "신청하기 ↓"}
                        </span>
                      </div>
                    )}
                  </>
                )}
                {isParty && (
                  <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_20px_rgba(80,230,160,0.15)]" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 날짜 안내 */}
      <div className="mt-4 flex items-center justify-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-primary animate-pulse" />
        <p className="text-[13px] text-fg-muted">
          <span className="font-semibold text-primary">{YEAR}년 {MONTH}월 {PARTY_DATE}일 (금)</span>에 파티가 열립니다
        </p>
      </div>

      {/* 신청 토글 */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5"
          >
            <div className="card relative overflow-hidden">
              <div
                className="absolute inset-0 -z-0 opacity-40"
                style={{
                  background:
                    "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(80,230,160,0.18), transparent 70%)",
                }}
              />
              <div className="relative text-center">
                <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.25em] text-primary">
                  Application
                </p>
                <h3 className="font-serif text-2xl font-semibold text-fg sm:text-3xl">
                  지금, 이상형을 만날 시간
                </h3>
                <p className="mt-2 text-[13px] text-fg-muted">
                  아래에서 성별을 선택하고 신청서를 작성해주세요.
                </p>
              </div>
              <div className="relative mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Link href="/apply/female" className="btn-primary group">
                  <span>여성 참가 신청</span>
                  <span className="transition-transform group-hover:translate-x-0.5">→</span>
                </Link>
                <Link href="/apply/male" className="btn-ghost group">
                  <span>남성 참가 신청</span>
                  <span className="transition-transform group-hover:translate-x-0.5">→</span>
                </Link>
              </div>
              <p className="relative mt-5 text-center text-[12px] text-fg-subtle">
                제출된 정보는 승인 절차에만 사용되며, 승인 시 이메일로 안내드립니다.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
