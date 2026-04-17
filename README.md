# LabMeet (랩미)

KAIST 석박사 재학/졸업자 대상 오프라인 파티 & 매칭 서비스의 랜딩 + 이상형 신청 폼.

## 스택
Next.js 14 · TypeScript · Tailwind CSS · Supabase · React Hook Form · Zod · Framer Motion

## 로컬 실행

```bash
cp .env.local.example .env.local
# .env.local에 Supabase URL + anon key 입력
npm install
npm run dev
```

## Supabase 설정

1. [Supabase Dashboard](https://supabase.com/dashboard)에서 신규 프로젝트 생성
2. SQL Editor에서 `supabase/migrations/20260417000000_create_applications.sql` 전체 실행
3. Project Settings > API 에서 다음을 복사:
   - `URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. `.env.local`에 저장 후 dev 서버 재시작

### 데이터 조회/운영 (Supabase Studio)

```sql
-- 신규 신청
SELECT id, name, department, lab_or_professor, gender, mbti, ideal_type, email, phone, created_at
FROM applications WHERE status = 'pending' ORDER BY created_at;

-- 승인 처리 (이후 이메일 수동 발송)
UPDATE applications SET status = 'approved', notes = 'YYYY-MM-DD 승인 이메일 발송'
WHERE id = '<uuid>';

-- 성별별 통계
SELECT gender, status, COUNT(*) FROM applications GROUP BY gender, status;
```

## 폴더 구조

```
app/
  page.tsx                        # 랜딩
  apply/[gender]/page.tsx         # 신청 폼 (female|male)
  apply/complete/page.tsx         # 완료 화면
components/
  landing/                        # Hero, About, CTA, Footer, Logo
  apply/                          # ApplyForm, MbtiSelector, PhoneInput, GenderBadge
lib/
  supabase/{client,server}.ts     # Supabase 클라이언트
  actions/submitApplication.ts    # Server Action (INSERT)
  validators/applySchema.ts       # Zod 유효성
supabase/migrations/              # DB 마이그레이션 SQL
```

## 디자인 시스템

- Primary: `#B6E9CC` (민트)
- Base: `#0B1410` (다크 그린-블랙)
- 타이포: Pretendard(본문) / Noto Serif KR(헤딩) / Playfair Display(영문 포인트)
- 테마: 진중하고 고급스러운 다크 그린 + 민트 포인트
