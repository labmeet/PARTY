import { createClient } from "@/lib/supabase/server";
import { submitQrMessageAction } from "@/lib/admin/actions";

export const dynamic = "force-dynamic";

type QrPost = {
  id: string;
  slug: string;
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
    .select("id, slug, prompt, body, active")
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
          <button type="submit" className="btn-primary w-full">
            남기기
          </button>
        </form>
      </div>
    </main>
  );
}
