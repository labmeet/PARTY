import Link from "next/link";

export default function ThanksPage({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <main className="min-h-screen bg-bg-base flex items-center justify-center px-6">
      <div className="text-center space-y-4 max-w-sm">
        <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-primary">
          Sent
        </p>
        <h1 className="font-serif text-[28px] font-bold text-fg leading-tight">
          메시지 잘 도착했어요
        </h1>
        <p className="text-[13px] text-fg-muted">
          파티에서 좋은 시간 보내세요!
        </p>
        <div className="pt-4">
          <Link
            href={`/q/${params.slug}`}
            className="text-[12px] text-fg-muted hover:text-fg transition-colors"
          >
            한 번 더 남기기 →
          </Link>
        </div>
      </div>
    </main>
  );
}
