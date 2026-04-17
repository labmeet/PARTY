export function Footer() {
  return (
    <footer className="container-page py-12 text-center">
      <div className="divider-fade mb-10" aria-hidden="true" />
      <p className="font-display text-sm tracking-[0.4em] text-fg-muted/80">
        LAB · MEET
      </p>
      <p className="mx-auto mt-4 max-w-md text-[13px] leading-relaxed text-fg-muted">
        LabMeet는 KAIST 구성원이 직접 만들었습니다.
        <br />
        만든 사람도 아직 싱글입니다.
      </p>
      <p className="mt-6 text-[11px] text-fg-subtle/70">
        © {new Date().getFullYear()} LabMeet. All rights reserved.
      </p>
    </footer>
  );
}
