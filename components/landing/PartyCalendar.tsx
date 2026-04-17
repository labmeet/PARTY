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
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="mx-[calc(50%-50vw+1.25rem)] mt-6 sm:mx-[calc(50%-44vw)] lg:mx-[calc(50%-480px)]"
          >
            <article className="relative mx-auto overflow-hidden rounded-[28px] border border-border bg-bg-card shadow-card sm:rounded-[36px]">
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(115deg, rgb(var(--t-accent) / 0.09) 0%, transparent 35%, transparent 65%, rgb(var(--t-accent-pop) / 0.08) 100%)",
                }}
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-px"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgb(var(--t-accent) / 0.6) 30%, rgb(var(--t-accent-pop) / 0.6) 70%, transparent)",
                }}
                aria-hidden="true"
              />

              <div className="relative grid grid-cols-1 gap-0 sm:grid-cols-[1.1fr_1fr]">
                {/* Left · Title block */}
                <div className="relative flex flex-col justify-between border-b border-border px-7 py-10 sm:border-b-0 sm:border-r sm:px-11 sm:py-14">
                  <div>
                    <p className="mb-4 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-pop">
                      <span className="h-1.5 w-1.5 rounded-full bg-pop" aria-hidden="true" />
                      1st Party
                    </p>
                    <h3 className="font-serif text-[30px] font-bold leading-[1.1] tracking-tight text-fg sm:text-[44px]">
                      랩미
                      <br />
                      1차 파티
                    </h3>
                    <p className="mt-5 max-w-[22ch] text-[13px] leading-relaxed text-fg-muted sm:text-[14px]">
                      랩실에서 눈만 마주치던 그 사람,
                      <br />
                      대전 W8에서 만납니다.
                    </p>
                  </div>
                  <div className="mt-8 flex items-center gap-3 text-[10px] tracking-[0.3em] text-fg-subtle">
                    <span className="h-px w-7 bg-border-strong" aria-hidden="true" />
                    <span className="font-display uppercase">KAIST · DAEJEON</span>
                  </div>
                </div>

                {/* Right · Ticket stub */}
                <div className="relative px-7 py-9 sm:px-10 sm:py-12">
                  <dl className="space-y-4">
                    <InfoRow label="Date" value={`${YEAR}.${String(MONTH).padStart(2, "0")}.${PARTY_DATE}`} hint="금요일" />
                    <InfoRow label="Time" value="18:00" hint="KST" />
                    <InfoRow label="Venue" value="KAIST W8" hint="1층" />
                    <InfoRow label="Fee" value="₩35,000" hint="현장 결제" />
                  </dl>

                  <button
                    type="button"
                    onClick={() => setApplyOpen((v) => !v)}
                    className="btn-primary mt-8"
                    aria-expanded={applyOpen}
                  >
                    <span>{applyOpen ? "접기" : "신청하기"}</span>
                    <span className={`transition-transform ${applyOpen ? "rotate-180" : ""}`}>
                      ↓
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {applyOpen && (
                      <motion.div
                        key="apply"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4">
                          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                            <Link href="/apply/female" className="btn-primary group">
                              <span>여성 신청</span>
                              <span className="transition-transform group-hover:translate-x-0.5">→</span>
                            </Link>
                            <Link href="/apply/male" className="btn-ghost group">
                              <span>남성 신청</span>
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
                </div>
              </div>

              {/* Perforation dots between columns (desktop only) */}
              <div
                className="pointer-events-none absolute left-1/2 top-1/2 hidden h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-bg-base sm:block"
                aria-hidden="true"
                style={{ boxShadow: "0 0 0 1px rgb(var(--border))" }}
              />
            </article>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function InfoRow({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="flex items-baseline gap-4 border-b border-border/60 pb-3 last:border-b-0 last:pb-0">
      <dt className="w-12 shrink-0 text-[10px] font-semibold uppercase tracking-[0.2em] text-fg-subtle">
        {label}
      </dt>
      <dd className="flex flex-1 items-baseline gap-2">
        <span className="font-serif text-[17px] font-bold text-fg sm:text-[19px]">
          {value}
        </span>
        {hint && (
          <span className="text-[11px] tracking-wide text-fg-subtle">
            {hint}
          </span>
        )}
      </dd>
    </div>
  );
}
