export function Footer() {
  return (
    <footer className="container-page border-t border-border py-10 text-center">
      <p className="font-display text-sm tracking-[0.3em] text-fg-muted">
        LAB · MEET
      </p>
      <p className="mt-3 text-[12px] text-fg-subtle">
        KAIST 내 연구자 커뮤니티 팀 · 문의는 승인 이메일을 통해 진행됩니다
      </p>
      <p className="mt-6 text-[11px] text-fg-subtle/70">
        © {new Date().getFullYear()} LabMeet. All rights reserved.
      </p>
    </footer>
  );
}
