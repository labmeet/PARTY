'use client';

import Link from "next/link";
import { useEffect, useRef } from "react";

type Variant = "full" | "compact" | "final";

export function ApplyCta({ variant = "full" }: { variant?: Variant }) {
  if (variant === "final") return <FinalCta />;

  const compact = variant === "compact";
  return (
    <section className="container-page py-8 sm:py-12">
      <div className="relative overflow-hidden rounded-[28px] border border-border bg-bg-card px-6 py-8 shadow-card sm:px-10 sm:py-10">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 0%, rgba(182, 233, 204, 0.10) 0%, transparent 65%)",
          }}
          aria-hidden="true"
        />
        {!compact && (
          <div className="relative mb-6 text-center">
            <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.3em] text-primary">
              Apply
            </p>
            <h3 className="font-serif text-[22px] font-bold leading-tight text-fg sm:text-[26px]">
              파티 신청하기
            </h3>
          </div>
        )}
        <div className="relative grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Link href="/apply/female" className="btn-primary group">
            <span>여성 신청하기</span>
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </Link>
          <Link href="/apply/male" className="btn-primary group">
            <span>남성 신청하기</span>
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </Link>
        </div>
        <p className="relative mt-4 text-center text-[12px] text-fg-subtle">
          알잌딱으로 자리 채워드림 · 얼리버드 4월 30일까지
        </p>
      </div>
    </section>
  );
}

function FinalCta() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = 0.5;
  }, []);

  return (
    <section className="container-page py-12 sm:py-20">
      <div className="relative">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="pointer-events-none w-full rounded-[32px]"
          style={{ mixBlendMode: "screen", display: "block" }}
        >
          <source src="/smoke.webm" type="video/webm" />
        </video>

        <div className="absolute bottom-0 left-0 right-0 translate-y-1/3 px-4 sm:px-8">
          <h2 className="mb-8 text-center font-serif text-[34px] font-bold leading-[1.2] tracking-tight text-primary sm:mb-10 sm:text-[44px]">
            이제 내 짝을
            <br />
            찾아볼까요?
          </h2>

          <div className="relative overflow-hidden rounded-[32px] border border-primary/25 bg-gradient-to-b from-bg-card to-bg-base px-7 py-12 shadow-[0_40px_80px_-30px_rgba(182,233,204,0.25)] sm:px-12 sm:py-14">
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 80% 70% at 50% 0%, rgba(182, 233, 204, 0.18) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 50% 100%, rgba(255, 95, 85, 0.08) 0%, transparent 65%)",
              }}
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgb(var(--primary) / 0.7), transparent)",
              }}
              aria-hidden="true"
            />

            <div className="relative text-center">
              <div className="mx-auto mb-8 inline-flex items-center gap-2.5 rounded-full border border-border-strong bg-bg-elevated/50 px-4 py-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
                <span className="text-[12px] tracking-[0.12em] text-fg sm:text-[13px]">
                  <span className="font-bold">5월 29일</span>
                  <span className="mx-2 text-fg-subtle">·</span>
                  <span>KAIST W8</span>
                </span>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Link href="/apply/female" className="btn-primary group">
                  <span>여성 신청하기</span>
                  <span className="transition-transform group-hover:translate-x-0.5">→</span>
                </Link>
                <Link href="/apply/male" className="btn-primary group">
                  <span>남성 신청하기</span>
                  <span className="transition-transform group-hover:translate-x-0.5">→</span>
                </Link>
              </div>

              <div className="mt-6 flex flex-col items-center gap-1 text-[12px] text-fg-subtle">
                <span>
                  <span className="text-fg-subtle/70 line-through decoration-[1.5px] mr-1.5">₩50,000</span>
                  <span className="font-semibold text-fg">₩35,000</span>
                </span>
                <span>얼리버드 · 4월 30일까지만</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
