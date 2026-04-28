import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "개인정보 처리방침 · LabMeet",
  description:
    "LabMeet 신청 폼을 통해 수집되는 개인정보의 항목·목적·보관 기간·파기 절차 안내",
};

const CONTACT_EMAIL = "labmeetadmin@gmail.com";
const UPDATED = "2026년 4월 18일";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen py-16 sm:py-20">
      <div className="container-page">
        <div className="mb-10 text-center">
          <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.25em] text-primary">
            Privacy Policy
          </p>
          <h1 className="font-serif text-[30px] font-bold tracking-tight text-fg sm:text-[40px]">
            개인정보 처리방침
          </h1>
          <p className="mt-3 text-[13px] text-fg-subtle">
            최종 업데이트: {UPDATED}
          </p>
        </div>

        <article className="space-y-7 rounded-[24px] border border-border bg-bg-card p-7 text-[14px] leading-[1.75] text-fg-muted sm:p-10">
          <Block no="01" title="수집 항목">
            신청서 제출 시 아래 정보를 수집합니다.
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>이름, 전화번호</li>
              <li>소속 학과, 소속 연구실 또는 지도교수</li>
              <li>성별, 키(선택), MBTI, 성격 키워드, 솔로 여부</li>
              <li>자기 소개(주관식), 만나고 싶지 않은 사람(선택)</li>
            </ul>
          </Block>

          <Block no="02" title="수집·이용 목적">
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>네트워킹 파티 참가 자격 심사 및 허수 방지</li>
              <li>승인/거절 결과 및 일정 안내 이메일 발송</li>
              <li>성별 균형 및 매칭 선호도 정렬을 위한 내부 운영</li>
              <li>
                파티 현장에서{" "}
                <span className="text-fg">별도 동의를 해주신 경우에 한해,</span>{" "}
                현재 제작 중인 랩미 앱 및 후속 행사 안내 등 서비스 고지 목적의
                커뮤니케이션에 활용될 수 있습니다.
              </li>
            </ul>
          </Block>

          <Block no="03" title="보관 기간">
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>승인된 신청서: 최종 참가일로부터 12개월</li>
              <li>거절·미선정 신청서: 심사 종료일로부터 3개월</li>
              <li>
                파티 현장에서 후속 고지에 동의하신 경우: 동의 철회 시까지
                (철회는 언제든 아래 문의처로 요청)
              </li>
              <li>신청자가 삭제 요청 시: 요청일로부터 7일 이내 파기</li>
            </ul>
          </Block>

          <Block no="04" title="제3자 제공">
            수집된 정보는{" "}
            <span className="text-fg">제3자에게 제공되지 않습니다.</span>{" "}
            데이터는 Supabase(클라우드 DB)에 저장되며, 운영진 외 접근 권한을
            가진 사람은 없습니다.
          </Block>

          <Block no="05" title="파기 방법">
            Supabase 데이터베이스에서 해당 레코드를 영구 삭제(DELETE)합니다.
            백업 스냅샷은 30일 주기로 순환 폐기됩니다.
          </Block>

          <Block no="06" title="신청자의 권리">
            본인 정보의 열람·수정·삭제·처리 정지·동의 철회를 언제든 요청할 수
            있습니다. 아래 문의처로 이메일을 주시면 영업일 기준 7일 이내
            처리합니다.
          </Block>

          <Block no="07" title="문의처">
            <p className="mt-1">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-primary underline underline-offset-4 hover:opacity-80"
              >
                {CONTACT_EMAIL}
              </a>
            </p>
          </Block>
        </article>

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

function Block({
  no,
  title,
  children,
}: {
  no: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex gap-5">
      <span className="w-10 shrink-0 select-none font-display text-[2rem] font-bold leading-[1] tabular-nums text-primary/35">
        {no}
      </span>
      <div className="flex-1">
        <h2 className="font-serif text-[17px] font-bold text-fg sm:text-[18px]">
          {title}
        </h2>
        <div className="mt-2 text-[13.5px]">{children}</div>
      </div>
    </section>
  );
}
