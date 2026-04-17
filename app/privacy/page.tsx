import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "개인정보 처리방침 · LabMeet",
  description: "LabMeet 신청 폼을 통해 수집되는 개인정보의 항목·목적·보관 기간·파기 절차를 안내합니다.",
};

const CONTACT_EMAIL = "labmeet.kaist@gmail.com";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen py-16 sm:py-20">
      <div className="container-page">
        <div className="mb-10 text-center">
          <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.25em] text-primary">
            Privacy Policy
          </p>
          <h1 className="font-serif text-display-md text-fg">개인정보 처리방침</h1>
          <p className="mt-3 text-[13px] text-fg-subtle">
            최종 업데이트: 2026년 4월 17일
          </p>
        </div>

        <section className="card space-y-6 text-[14px] leading-relaxed text-fg-muted">
          <Block no="01" title="수집 항목">
            신청 폼 제출 시 다음 항목을 수집합니다.
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>이름, 이메일, 전화번호</li>
              <li>소속 학과, 소속 연구실 이름 또는 지도교수 성함</li>
              <li>성별, MBTI, 이상형(주관식 서술)</li>
            </ul>
          </Block>

          <Block no="02" title="수집·이용 목적">
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>오프라인 파티 참가 자격 심사 및 허수 방지</li>
              <li>승인/거절 결과 및 파티 일정 안내 이메일 발송</li>
              <li>성별 균형 및 매칭 선호도 정렬을 위한 내부 운영</li>
            </ul>
          </Block>

          <Block no="03" title="보관 기간">
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>승인된 신청서: 최종 참가일로부터 12개월 후 파기</li>
              <li>거절·미선정 신청서: 심사 종료일로부터 3개월 후 파기</li>
              <li>신청자가 삭제 요청 시: 요청일로부터 7일 이내 파기</li>
            </ul>
          </Block>

          <Block no="04" title="제3자 제공">
            수집된 정보는 <span className="text-fg">제3자에게 제공되지 않습니다</span>. 데이터는 Supabase(클라우드 DB)에 저장되며, 운영진 외 접근 권한을 가진 사람은 없습니다.
          </Block>

          <Block no="05" title="파기 방법">
            Supabase 데이터베이스에서 해당 레코드를 영구 삭제(DELETE)하며, 백업 스냅샷은 30일 주기로 순환 폐기됩니다.
          </Block>

          <Block no="06" title="신청자의 권리">
            본인 정보의 열람·수정·삭제·처리 정지를 언제든 요청할 수 있으며, 아래 문의처로 이메일을 보내시면 영업일 기준 7일 이내 처리됩니다.
          </Block>

          <Block no="07" title="문의처">
            <p className="mt-1">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-primary underline underline-offset-4 hover:text-primary-deep"
              >
                {CONTACT_EMAIL}
              </a>
            </p>
          </Block>
        </section>

        <div className="mt-10 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[13px] text-fg-subtle hover:text-primary"
          >
            ← 처음으로 돌아가기
          </Link>
        </div>
      </div>
    </main>
  );
}

function Block({ no, title, children }: { no: string; title: string; children: React.ReactNode }) {
  return (
    <article className="flex gap-5">
      <span className="w-10 shrink-0 select-none font-display text-[2.25rem] leading-[1] tabular-nums text-primary/30">{no}</span>
      <div className="flex-1">
        <h2 className="font-serif text-base font-semibold text-fg">{title}</h2>
        <div className="mt-1.5 text-[13.5px]">{children}</div>
      </div>
    </article>
  );
}
