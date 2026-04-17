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
  const [infoOpen, setInfoOpen] = useState(false);
  const [applyOpen, setApplyOpen] = useState(false);

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
        <h2 className="font-serif text-[26px] font-bold leading-tight text-fg sm:text-[34px]">
          {YEAR}년 {MONTH}월 파티
        </h2>
        <p className="mt-2 text-[13px] text-fg-muted sm:text-[14px]">
          날짜를 클릭해보세요
        </p>
      </div>

      <div className="card overflow-hidden p-0">
        <div className="grid grid-cols-7 border-b border-border">
          {DAYS.map((d, i) => (
            <div
              key={d}
              className={`py-3 text-center text-[11px] font-semibold tracking-widest sm:text-[12px] ${
                i === 0 ? "text-[#E57373]" : i === 6 ? "text-[#6BA6C7]" : "text-fg-subtle"
              }`}
            >
              {d}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7">
          {cells.map((day, idx) => {
            const isParty = day === PARTY_DATE;
            const isSun = idx % 7 === 0;
            const isSat = idx % 7 === 6;

            return (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  if (!isParty) return;
                  setInfoOpen((v) => !v);
                  if (infoOpen) setApplyOpen(false);
                }}
                disabled={!isParty}
                aria-label={
                  isParty ? `${YEAR}년 ${MONTH}월 ${day}일 파티 정보` : undefined
                }
                className={`relative flex min-h-[56px] flex-col items-center justify-start pt-2.5 border-b border-r border-border transition-all sm:min-h-[72px]
                  ${isParty ? "cursor-pointer bg-primary/10 hover:bg-primary/20" : "cursor-default"}
                  ${idx % 7 === 6 ? "border-r-0" : ""}
                  ${Math.floor(idx / 7) === 5 ? "border-b-0" : ""}
                `}
              >
                {day && (
                  <>
                    <span
                      className={`text-[12px] font-medium leading-none sm:text-[15px]
                        ${isParty
                          ? "flex h-7 w-7 items-center justify-center rounded-full bg-primary font-bold text-bg-card shadow-glow"
                          : isSun ? "text-[#E57373]"
                          : isSat ? "text-[#6BA6C7]"
                          : "text-fg"}
                      `}
                    >
                      {day}
                    </span>
                    {isParty && (
                      <span className="mt-1.5 text-[9px] font-bold tracking-wider text-primary leading-none sm:text-[10px]">
                        PARTY
                      </span>
                    )}
                  </>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center gap-2">
        <span className="h-2 w-2 rounded-full bg-pop animate-pulse" />
        <p className="text-[13px] text-fg-muted">
          <span className="font-semibold text-fg">{YEAR}.{String(MONTH).padStart(2, "0")}.{PARTY_DATE}</span>{" "}
          금요일에 열립니다
        </p>
      </div>

      <AnimatePresence initial={false}>
        {infoOpen && (
          <motion.div
            key="info"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5"
          >
            <article className="relative overflow-hidden rounded-[28px] border border-border bg-bg-card px-7 py-9 shadow-card sm:px-10 sm:py-11">
              <div
                className="pointer-events-none absolute inset-0 -z-0"
                style={{
                  background:
                    "radial-gradient(ellipse 75% 55% at 50% 0%, rgba(20, 210, 120, 0.12) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 50% 100%, rgba(255, 95, 85, 0.08) 0%, transparent 65%)",
                }}
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-px"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgb(var(--t-accent) / 0.7), transparent)",
                }}
                aria-hidden="true"
              />

              <p className="relative mb-3 text-center text-[10px] font-semibold uppercase tracking-[0.3em] text-pop">
                1st Party
              </p>
              <h3 className="relative text-center font-serif text-[24px] font-bold leading-tight text-fg sm:text-[30px]">
                랩미 1차 파티
              </h3>

              <dl className="relative mt-7 space-y-3 border-t border-b border-border py-5">
                <InfoRow label="DATE" value={`${YEAR}.${String(MONTH).padStart(2, "0")}.${PARTY_DATE} (금)`} />
                <InfoRow label="TIME" value="18:00" />
                <InfoRow label="VENUE" value="KAIST W8 1층" />
                <InfoRow label="FEE" value="₩35,000" />
              </dl>

              <div className="relative mt-6">
                <button
                  type="button"
                  onClick={() => setApplyOpen((v) => !v)}
                  className="btn-primary"
                  aria-expanded={applyOpen}
                >
                  <span>{applyOpen ? "접기" : "신청하기"}</span>
                  <span
                    className={`transition-transform ${applyOpen ? "rotate-180" : ""}`}
                  >
                    ↓
                  </span>
                </button>
              </div>

              <AnimatePresence initial={false}>
                {applyOpen && (
                  <motion.div
                    key="apply"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="relative overflow-hidden"
                  >
                    <div className="pt-4 sm:pt-5">
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <Link href="/apply/female" className="btn-primary group">
                          <span>여성 신청하기</span>
                          <span className="transition-transform group-hover:translate-x-0.5">→</span>
                        </Link>
                        <Link href="/apply/male" className="btn-ghost group">
                          <span>남성 신청하기</span>
                          <span className="transition-transform group-hover:translate-x-0.5">→</span>
                        </Link>
                      </div>
                      <p className="mt-4 text-center text-[12px] text-fg-subtle">
                        알잘딱으로 자리 채워드림 · 정원 제한 · 얼리버드가 유리합니다
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </article>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline gap-4">
      <dt className="w-14 shrink-0 text-[10px] font-semibold uppercase tracking-[0.22em] text-fg-subtle">
        {label}
      </dt>
      <dd className="flex-1 font-serif text-[15px] font-bold text-fg sm:text-[16px]">
        {value}
      </dd>
    </div>
  );
}
