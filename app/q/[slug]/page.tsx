import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { submitQrMessageAction } from "@/lib/admin/actions";
import { SubmitButton } from "@/app/admin/components/SubmitButton";

export const dynamic = "force-dynamic";

type QrPost = {
  id: string;
  slug: string;
  kind: "private" | "public";
  prompt: string;
  body: string | null;
  active: boolean;
};

export default async function PublicQrPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { error?: string };
}) {
  const supabase = createClient();
  const { data: post } = await supabase
    .from("qr_posts")
    .select("id, slug, kind, prompt, body, active")
    .eq("slug", params.slug)
    .maybeSingle<QrPost>();

  if (!post || !post.active) {
    return (
      <main className="min-h-screen bg-bg-base flex items-center justify-center px-6">
        <div className="text-center space-y-2">
          <p className="font-serif text-[22px] font-bold text-fg">
            유효하지 않은 QR이에요
          </p>
          <p className="text-[13px] text-fg-muted">
            QR이 만료되었거나 삭제되었습니다
          </p>
        </div>
      </main>
    );
  }

  if (post.kind === "private") {
    const { data: takenData } = await supabase.rpc("taken_elements");
    const elements = (Array.isArray(takenData) ? (takenData as string[]) : [])
      .filter((s) => typeof s === "string" && s.trim().length > 0)
      .sort();

    return (
      <main className="min-h-screen bg-bg-base px-4 py-12 sm:py-16">
        <div className="container-page max-w-2xl space-y-8">
          <header className="text-center space-y-2">
            <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-primary">
              Private Message
            </p>
            <h1 className="font-serif text-[28px] font-bold text-fg sm:text-[34px]">
              {post.prompt}
            </h1>
            {post.body && (
              <p className="text-[13px] text-fg-muted leading-relaxed">
                {post.body}
              </p>
            )}
            <p className="mt-2 text-[12px] text-fg-muted">
              보낼 사람의 원소를 골라주세요
            </p>
          </header>

          {elements.length === 0 ? (
            <p className="text-center text-[13px] text-fg-muted py-10">
              아직 등록된 참가자가 없어요
            </p>
          ) : (
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 sm:gap-4">
              {elements.map((el) => (
                <Link
                  key={el}
                  href={`/q/${params.slug}/to/${encodeURIComponent(el)}`}
                  className="card group flex aspect-square flex-col items-center justify-center transition-all hover:border-primary"
                >
                  <span className="font-serif text-[28px] font-bold text-fg sm:text-[34px]">
                    {el}
                  </span>
                  <span className="mt-1 text-[10px] uppercase tracking-[0.18em] text-fg-subtle group-hover:text-primary">
                    보내기 →
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    );
  }

  // public
  return (
    <main className="min-h-screen bg-bg-base px-4 py-12 sm:py-16">
      <div className="container-page max-w-md space-y-6">
        <header className="text-center space-y-2">
          <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-pop">
            공공 포스팅
          </p>
          <h1 className="font-serif text-[26px] font-bold text-fg sm:text-[30px]">
            {post.prompt}
          </h1>
          {post.body && (
            <p className="text-[13px] text-fg-muted leading-relaxed mx-auto">
              {post.body}
            </p>
          )}
          <p className="mt-2 text-[12px] text-fg-muted">
            스크린에 함께 띄워질 메시지를 남겨주세요
          </p>
        </header>

        <form action={submitQrMessageAction} className="card space-y-4">
          <input type="hidden" name="slug" value={post.slug} />
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
          <SubmitButton pendingText="보내는 중...">남기기</SubmitButton>
        </form>
      </div>
    </main>
  );
}
