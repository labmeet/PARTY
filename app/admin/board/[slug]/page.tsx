import { redirect } from "next/navigation";
import { isAuthed } from "@/lib/admin/auth";
import { createAdminClient } from "@/lib/supabase/admin";
import { AutoRefresh } from "@/app/admin/components/AutoRefresh";

export const dynamic = "force-dynamic";

type QrPost = {
  id: string;
  slug: string;
  kind: "private" | "public";
  topic: string | null;
};

type QrMessage = {
  id: string;
  body: string;
  author_label: string | null;
  created_at: string;
};

export default async function AdminBoardPage({
  params,
}: {
  params: { slug: string };
}) {
  if (!isAuthed()) redirect("/admin/login");

  const supabase = createAdminClient();
  const { data: post } = await supabase
    .from("qr_posts")
    .select("id, slug, kind, topic")
    .eq("slug", params.slug)
    .maybeSingle<QrPost>();

  if (!post || post.kind !== "public") redirect("/admin");

  const { data: msgData } = await supabase
    .from("qr_messages")
    .select("id, body, author_label, created_at")
    .eq("post_id", post.id)
    .order("created_at", { ascending: false })
    .limit(24);
  const messages = (msgData ?? []) as QrMessage[];

  return (
    <main className="min-h-screen bg-black text-fg">
      <AutoRefresh ms={6000} />
      <div className="px-8 py-12 sm:px-16 sm:py-16 min-h-screen flex flex-col">
        <header className="mb-10 sm:mb-14">
          <p className="text-[12px] sm:text-[14px] font-semibold uppercase tracking-[0.4em] text-primary">
            Live Board · LabMeet
          </p>
          <h1 className="font-serif text-[36px] sm:text-[56px] font-bold text-fg mt-3 leading-tight">
            {post.topic}
          </h1>
        </header>

        {messages.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-[18px] sm:text-[22px] text-fg-muted">
              QR을 스캔해서 메시지를 남겨주세요
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 flex-1 content-start">
            {messages.map((m) => (
              <div
                key={m.id}
                className="card animate-fade-up"
                style={{
                  background: "rgb(var(--bg-card))",
                }}
              >
                {m.author_label && (
                  <p className="text-[11px] sm:text-[12px] font-semibold text-primary mb-2 uppercase tracking-[0.18em]">
                    — {m.author_label}
                  </p>
                )}
                <p className="text-[16px] sm:text-[20px] leading-[1.55] text-fg whitespace-pre-wrap">
                  {m.body}
                </p>
              </div>
            ))}
          </div>
        )}

        <p className="mt-10 text-center text-[11px] uppercase tracking-[0.4em] text-fg-subtle">
          /q/{post.slug}
        </p>
      </div>
    </main>
  );
}
