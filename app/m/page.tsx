import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function MessageDirectoryPage() {
  const supabase = createClient();
  const { data } = await supabase.rpc("taken_elements");
  const elements = (Array.isArray(data) ? (data as string[]) : []).filter(
    (s) => typeof s === "string" && s.trim().length > 0
  );
  elements.sort();

  return (
    <main className="min-h-screen bg-bg-base px-4 py-12 sm:py-16">
      <div className="container-page max-w-2xl space-y-8">
        <header className="text-center space-y-2">
          <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-primary">
            Private Message
          </p>
          <h1 className="font-serif text-[28px] font-bold text-fg sm:text-[34px]">
            누구에게 한마디 보낼까요?
          </h1>
          <p className="text-[13px] text-fg-muted">
            보낼 사람의 원소를 골라주세요. 받는 사람만 볼 수 있어요.
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
                href={`/m/${encodeURIComponent(el)}`}
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
