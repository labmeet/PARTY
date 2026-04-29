import Link from "next/link";

export default function PrivateThanksPage({
  params,
}: {
  params: { element: string };
}) {
  const element = decodeURIComponent(params.element);
  return (
    <main className="min-h-screen bg-bg-base flex items-center justify-center px-6">
      <div className="text-center space-y-4 max-w-sm">
        <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-primary">
          Sent
        </p>
        <h1 className="font-serif text-[28px] font-bold text-fg leading-tight">
          <span className="text-primary">{element}</span>에게 메시지를 보냈어요
        </h1>
        <p className="text-[13px] text-fg-muted">파티 즐겨요!</p>
        <div className="pt-4 flex flex-col gap-2 items-center">
          <Link
            href="/m"
            className="text-[13px] font-semibold text-fg hover:text-primary transition-colors"
          >
            다른 사람에게도 보내기 →
          </Link>
          <Link
            href={`/m/${encodeURIComponent(element)}`}
            className="text-[12px] text-fg-muted hover:text-fg transition-colors"
          >
            {element}에게 한 번 더 보내기
          </Link>
        </div>
      </div>
    </main>
  );
}
