import Link from "next/link";
import { notFound } from "next/navigation";
import { ApplyForm } from "@/components/apply/ApplyForm";
import { genderEnum } from "@/lib/validators/applySchema";

export function generateStaticParams() {
  return [{ gender: "female" }, { gender: "male" }];
}

export default function ApplyPage({
  params,
}: {
  params: { gender: string };
}) {
  const parsed = genderEnum.safeParse(params.gender);
  if (!parsed.success) notFound();
  const gender = parsed.data;

  return (
    <main className="min-h-screen pb-20">
      <div className="container-narrow pt-10 sm:pt-14">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-[13px] text-fg-muted transition-colors hover:text-primary"
        >
          <span aria-hidden>←</span> 돌아가기
        </Link>

        <header className="mt-6 mb-8 text-center">
          <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.25em] text-primary">
            Application Form
          </p>
          <h1 className="font-serif text-display-md text-fg">
            이상형 신청서
          </h1>
          <p className="mt-2 text-[13px] text-fg-muted">
            빠짐없이 작성해주시면 승인 후 이메일로 안내드립니다.
          </p>
        </header>

        <ApplyForm gender={gender} />
      </div>
    </main>
  );
}
