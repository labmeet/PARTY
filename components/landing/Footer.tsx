import Link from "next/link";

export function Footer() {
  return (
    <footer className="container-page py-10 text-center">
      <div className="divider-fade mb-10" aria-hidden="true" />
      <p className="font-display text-sm tracking-[0.4em] text-fg-muted/80">
        LAB · MEET
      </p>
      <p className="mx-auto mt-3 max-w-md text-[12px] leading-relaxed text-fg-muted">
        랩미 : 좋아하는 것을 쫓다 짝을 찾을 기회를 놓치지 않길 바라는 사람들이 모인 카이스트 내 팀입니다.
      </p>
      <p className="mt-5 text-[12px]">
        <Link href="/privacy" className="text-fg-subtle underline-offset-4 hover:text-primary hover:underline">
          개인정보 처리방침
        </Link>
      </p>
      <p className="mt-6 text-[11px] text-fg-subtle/70">
        © {new Date().getFullYear()} LabMeet. All rights reserved.
      </p>
    </footer>
  );
}
