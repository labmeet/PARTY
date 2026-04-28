import Link from "next/link";
import { notFound } from "next/navigation";
import { ApplyForm } from "@/components/apply/ApplyForm";
import { genderEnum } from "@/lib/validators/applySchema";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function ApplyPage({
  params,
}: {
  params: { gender: string };
}) {
  const parsed = genderEnum.safeParse(params.gender);
  if (!parsed.success) notFound();
  const gender = parsed.data;

  const supabase = createClient();
  const { data: takenData } = await supabase.rpc("taken_elements");
  const takenElements = Array.isArray(takenData) ? (takenData as string[]) : [];

  return (
    <main className="min-h-screen pb-20">
      <div className="container-narrow pt-10 sm:pt-14">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-[13px] text-fg-muted transition-colors hover:text-primary"
        >
          <span aria-hidden>←</span> 돌아가기
        </Link>

        <header className="mb-8 mt-6 text-center">
          <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.25em] text-primary">
            Application Form
          </p>
          <h1 className="font-serif text-display-md text-fg">자기 소개서</h1>
          <p className="mt-2 text-[13px] text-fg-muted">
            편하게 작성해주시면 확인 후 이메일로 안내드리겠습니다.
          </p>
        </header>

        <ApplyForm gender={gender} takenElements={takenElements} />
      </div>
    </main>
  );
}
