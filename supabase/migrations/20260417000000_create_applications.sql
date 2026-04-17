-- LabMeet (랩미) applications table
-- Apply via Supabase Studio > SQL Editor, or `supabase db push`

-- 1) enum types
CREATE TYPE gender_type        AS ENUM ('female', 'male');
CREATE TYPE application_status AS ENUM ('pending', 'approved', 'rejected');

-- 2) applications table
CREATE TABLE applications (
  id               uuid               PRIMARY KEY DEFAULT gen_random_uuid(),
  name             text               NOT NULL,
  department       text               NOT NULL,
  lab_or_professor text               NOT NULL,
  phone            text               NOT NULL,
  gender           gender_type        NOT NULL,
  mbti             text               NOT NULL,
  ideal_type       text               NOT NULL,
  email            text               NOT NULL,
  status           application_status NOT NULL DEFAULT 'pending',
  notes            text,
  created_at       timestamptz        NOT NULL DEFAULT now(),
  updated_at       timestamptz        NOT NULL DEFAULT now(),
  CONSTRAINT chk_mbti  CHECK (mbti  ~ '^[EI][NS][TF][JP]$'),
  CONSTRAINT chk_email CHECK (email ~ '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'),
  CONSTRAINT chk_phone CHECK (phone ~ '^\+?82-?\d{1,2}-?\d{3,4}-?\d{4}$|^0\d{1,2}-?\d{3,4}-?\d{4}$'),
  CONSTRAINT uq_email  UNIQUE (email),
  CONSTRAINT uq_phone  UNIQUE (phone)
);

-- 3) indexes
CREATE INDEX idx_applications_status            ON applications (status);
CREATE INDEX idx_applications_created_at        ON applications (created_at DESC);
CREATE INDEX idx_applications_gender            ON applications (gender);
CREATE INDEX idx_applications_status_created    ON applications (status, created_at DESC);

-- 4) updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_applications_updated_at
  BEFORE UPDATE ON applications
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 5) RLS
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anon_insert_only"
  ON applications FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "service_role_full_access"
  ON applications FOR ALL TO service_role
  USING (true) WITH CHECK (true);

-- 6) comments
COMMENT ON TABLE  applications                  IS 'LabMeet 이상형 매칭 신청 폼. 관리자는 Supabase Studio에서 조회.';
COMMENT ON COLUMN applications.lab_or_professor IS '소속 연구실 이름 또는 지도교수 이름';
COMMENT ON COLUMN applications.ideal_type       IS '이상형 주관식 서술';
COMMENT ON COLUMN applications.notes            IS '관리자 내부 메모';
COMMENT ON COLUMN applications.status           IS 'pending/approved(이메일 발송)/rejected';
