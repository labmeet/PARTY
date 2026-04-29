import { redirect } from "next/navigation";
import { isAuthed } from "@/lib/admin/auth";
import { loginAction } from "@/lib/admin/actions";
import { SubmitButton } from "@/app/admin/components/SubmitButton";

export const dynamic = "force-dynamic";

export default function AdminLoginPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  if (isAuthed()) redirect("/admin");

  return (
    <main className="min-h-screen bg-bg-base px-6 py-20 flex items-center justify-center">
      <form
        action={loginAction}
        className="card w-full max-w-sm space-y-5"
      >
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-primary">
            Admin
          </p>
          <h1 className="font-serif text-[24px] font-bold text-fg mt-2">
            관리자 로그인
          </h1>
        </div>
        <input
          name="password"
          type="password"
          placeholder="비밀번호"
          autoFocus
          required
          className="input-base"
        />
        {searchParams.error && (
          <p className="text-[12px] text-pop">비밀번호가 틀립니다</p>
        )}
        <SubmitButton pendingText="로그인 중...">로그인</SubmitButton>
      </form>
    </main>
  );
}
