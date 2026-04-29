import Link from "next/link";
import { redirect } from "next/navigation";
import { isAuthed } from "@/lib/admin/auth";
import { createAdminClient } from "@/lib/supabase/admin";
import { AutoRefresh } from "@/app/admin/components/AutoRefresh";

export const dynamic = "force-dynamic";

type PrivateMessage = {
  id: string;
  target_element: string;
  body: string;
  author_label: string | null;
  created_at: string;
};

export default async function AdminPrivateMessagesPage() {
  if (!isAuthed()) redirect("/admin/login");

  const supabase = createAdminClient();
  const { data } = await supabase
    .from("private_messages")
    .select("id, target_element, body, author_label, created_at")
    .order("created_at", { ascending: false });

  const messages = (data ?? []) as PrivateMessage[];

  const grouped = messages.reduce<Record<string, PrivateMessage[]>>(
    (acc, m) => {
      (acc[m.target_element] ||= []).push(m);
      return acc;
    },
    {}
  );

  const groups = Object.entries(grouped).sort(
    (a, b) =>
      new Date(b[1][0].created_at).getTime() -
      new Date(a[1][0].created_at).getTime()
  );

  return (
    <main className="min-h-screen bg-bg-base px-4 py-10 sm:py-14">
      <AutoRefresh ms={8000} />
      <div className="container-page max-w-3xl space-y-8">
        <Link
          href="/admin"
          className="text-[12px] text-fg-muted hover:text-fg transition-colors"
        >
          ← 대시보드
        </Link>

        <header className="space-y-1">
          <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-primary">
            Private Inbox
          </p>
          <h1 className="font-serif text-[28px] font-bold text-fg">
            개인 메시지함
          </h1>
          <p className="text-[12px] text-fg-muted">
            총 {messages.length}개 · 8초마다 새로고침
          </p>
        </header>

        {groups.length === 0 ? (
          <p className="text-[13px] text-fg-muted text-center py-12">
            아직 받은 메시지가 없어요
          </p>
        ) : (
          <div className="space-y-8">
            {groups.map(([element, msgs]) => (
              <section key={element} className="space-y-3">
                <header className="flex items-baseline gap-3 border-b border-border pb-2">
                  <h2 className="font-serif text-[22px] font-bold text-primary">
                    {element}
                  </h2>
                  <p className="text-[12px] text-fg-muted">
                    {msgs.length}개 받음
                  </p>
                </header>
                <ul className="space-y-2">
                  {msgs.map((m) => (
                    <li key={m.id} className="card">
                      {m.author_label && (
                        <p className="text-[11px] font-semibold text-primary mb-1">
                          — {m.author_label}
                        </p>
                      )}
                      <p className="text-[14px] leading-[1.7] text-fg whitespace-pre-wrap">
                        {m.body}
                      </p>
                      <p className="text-[10px] text-fg-subtle mt-2">
                        {new Date(m.created_at).toLocaleString("ko-KR")}
                      </p>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
