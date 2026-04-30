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
                aria-label={isParty ? `${YEAR}년 ${MONTH}월 ${day}일 파티 정보` : undefined}
                className={`relative flex min-h-[56px] flex-col items-center justify-start border-b border-r border-border pt-2.5 transition-all sm:min-h-[72px]
                  ${isParty ? "cursor-pointer bg-primary/10 hover:bg-primary/20" : "cursor-default"}
                  ${idx % 7 === 6 ? "border-r-0" : ""}
                  ${Math.floor(idx / 7) === 5 ? "border-b-0" : ""}
                `}
              >
                {day && (
                  <>
                    <span
                      className={`text-[12px] font-medium leading-none sm:text-[15px]
                        ${
                          isParty
                            ? "flex h-7 w-7 items-center justify-center rounded-full bg-primary font-bold text-bg-card shadow-glow"
                            : isSun
                              ? "text-[#E57373]"
                              : isSat
                                ? "text-[#6BA6C7]"
                                : "text-fg"
                        }
                      `}
                    >
                      {day}
                    </span>
                    {isParty && (
                      <span className="mt-1.5 text-[8px] font-bold leading-none tracking-wider text-primary sm:text-[9px]">
                        Launch Party
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
        <span className="h-2 w-2 animate-pulse rounded-full bg-pop" />
        <p className="text-[13px] text-fg-muted">
          <span className="font-semibold text-fg">
            {YEAR}.{String(MONTH).padStart(2, "0")}.{PARTY_DATE} 20:00
          </span>
, 첫 랩미가 열립니다
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
                <div className="relative flex flex-col justify-between border-b border-border px-7 py-10 sm:border-b-0 sm:border-r sm:px-11 sm:py-14">
                  <div>
                    <p className="mb-4 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-pop">
                      <span className="h-1.5 w-1.5 rounded-full bg-pop" aria-hidden="true" />
                      1st Party
                    </p>
                    <h3 className="font-serif text-[30px] font-bold leading-[1.1] tracking-tight text-fg sm:text-[44px]">
                      랩미
                      <br />
                      런칭 파티
                    </h3>
                    <p className="mt-5 max-w-[22ch] text-[13px] leading-relaxed text-fg-muted sm:text-[14px]">
                      5월 29일,
                      <br />
                      첫 랩미가 열립니다.
                    </p>
                    <p className="mt-4 max-w-[28ch] text-[12px] font-medium leading-relaxed text-fg sm:text-[13px]">
                      와인 · 치즈 플레이트 · 스낵 제공
                      <br />
                      정원 32명 (남 16 · 여 16)
                    </p>
                  </div>
                  <div className="mt-8 flex items-center gap-3 text-[10px] tracking-[0.3em] text-fg-subtle">
                    <span className="h-px w-7 bg-border-strong" aria-hidden="true" />
                    <span className="font-display uppercase">KAIST · DAEJEON</span>
                  </div>
                </div>

                <div className="relative px-7 py-9 sm:px-10 sm:py-12">
                  <dl className="space-y-4">
                    <InfoRow label="Date" value={`${YEAR}.${String(MONTH).padStart(2, "0")}.${PARTY_DATE}`} hint="금요일" />
                    <InfoRow label="Time" value="20:00" hint="KST" />
                    <InfoRow label="Venue" value="W8 1층" />
                    <InfoRow
                      label="Fee"
                      value="35,000원"
                      hint="얼리버드 1차 ~5/9 · 2차 ~5/23"
                      strike="50,000원"
                    />
                  </dl>

                  <button
                    type="button"
                    onClick={() => setApplyOpen((v) => !v)}
                    className="btn-primary mt-8"
                    aria-expanded={applyOpen}
                  >
                    <span>{applyOpen ? "접기" : "신청하기"}</span>
                    <span className={`transition-transform ${applyOpen ? "rotate-180" : ""}`}>
                      ⌄
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
                          <SeatStatus />
                          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                            <Link href="/apply/female" className="btn-primary group">
                              <span>여성 신청</span>
                              <span className="transition-transform group-hover:translate-x-0.5">→</span>
                            </Link>
                            <Link href="/apply/male" className="btn-primary group">
                              <span>남성 신청</span>
                              <span className="transition-transform group-hover:translate-x-0.5">→</span>
                            </Link>
                          </div>
                          <p className="mt-4 text-center text-[12px] text-fg-subtle">
                            얼리버드 1차는 5월 9일까지, 얼리버드 2차는 5월 23일까지 적용됩니다
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

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

const FEMALE_TAKEN = 12;
const MALE_TAKEN = 15;
const PER_GENDER_CAP = 16;

function SeatStatus() {
  return (
    <div className="grid grid-cols-2 gap-3">
      <SeatPill label="여성" taken={FEMALE_TAKEN} cap={PER_GENDER_CAP} />
      <SeatPill label="남성" taken={MALE_TAKEN} cap={PER_GENDER_CAP} />
    </div>
  );
}

function SeatPill({ label, taken, cap }: { label: string; taken: number; cap: number }) {
  const remaining = Math.max(cap - taken, 0);
  const pct = Math.min((taken / cap) * 100, 100);
  const tight = remaining <= 3;
  return (
    <div className="rounded-2xl border border-border bg-bg-elevated/40 px-4 py-3">
      <div className="flex items-baseline justify-between">
        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-fg-subtle">
          {label}
        </span>
        <span className="font-display text-[13px] tabular-nums text-fg">
          <span className={tight ? "font-bold text-pop" : "font-bold text-primary"}>
            {taken}
          </span>
          <span className="mx-0.5 text-fg-subtle">/</span>
          <span className="text-fg-subtle">{cap}</span>
        </span>
      </div>
      <div className="mt-2 h-1 overflow-hidden rounded-full bg-border/60">
        <div
          className={`h-full rounded-full ${tight ? "bg-pop" : "bg-primary"}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="mt-2 text-[11px] tabular-nums text-fg-subtle">
        남은 좌석{" "}
        <span className={`font-semibold ${tight ? "text-pop" : "text-fg"}`}>
          {remaining}석
        </span>
      </p>
    </div>
  );
}

function InfoRow({
  label,
  value,
  hint,
  strike,
}: {
  label: string;
  value: string;
  hint?: string;
  strike?: string;
}) {
  return (
    <div className="flex items-baseline gap-4 border-b border-border/60 pb-3 last:border-b-0 last:pb-0">
      <dt className="w-12 shrink-0 text-[10px] font-semibold uppercase tracking-[0.2em] text-fg-subtle">
        {label}
      </dt>
      <dd className="flex flex-1 flex-wrap items-baseline gap-2">
        {strike && (
          <span className="font-serif text-[14px] font-medium text-fg-subtle line-through decoration-[1.5px] sm:text-[15px]">
            {strike}
          </span>
        )}
        <span className="font-serif text-[17px] font-bold text-fg sm:text-[19px]">
          {value}
        </span>
        {hint && <span className="text-[11px] tracking-wide text-fg-subtle">{hint}</span>}
      </dd>
    </div>
  );
}
