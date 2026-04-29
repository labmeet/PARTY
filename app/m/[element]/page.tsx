import Link from "next/link";
import { submitPrivateMessageAction } from "@/lib/admin/actions";

export const dynamic = "force-dynamic";

export default function PrivateMessageFormPage({
  params,
  searchParams,
}: {
  params: { element: string };
  searchParams: { error?: string };
}) {
  const element = decodeURIComponent(params.element);

  return (
    <main className="min-h-screen bg-bg-base px-4 py-12 sm:py-16">
      <div className="container-page max-w-md space-y-6">
        <Link
          href="/m"
          className="text-[12px] text-fg-muted hover:text-fg transition-colors"
        >
          ← 받는 사람 다시 고르기
        </Link>

        <header className="text-center space-y-2">
          <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-primary">
            Private Message
          </p>
          <h1 className="font-serif text-[28px] font-bold text-fg sm:text-[32px]">
            <span className="text-primary">{element}</span>에게 한마디
          </h1>
          <p className="text-[13px] text-fg-muted">
            받는 사람({element})만 볼 수 있어요. 익명으로도 가능합니다.
          </p>
        </header>

        <form action={submitPrivateMessageAction} className="card space-y-4">
          <input type="hidden" name="target_element" value={element} />
          <textarea
            name="body"
            required
            minLength={1}
            maxLength={500}
            rows={5}
            placeholder="여기에 적어주세요 (최대 500자)"
            className="input-base resize-none"
          />
          <input
            name="author_label"
            maxLength={40}
            placeholder="보내는 사람 원소 (선택, 예: Au)"
            className="input-base"
          />
          {searchParams.error && (
            <p className="text-[12px] text-pop">
              메시지를 다시 확인해주세요
            </p>
          )}
          <button type="submit" className="btn-primary w-full">
            보내기
          </button>
        </form>
      </div>
    </main>
  );
}
