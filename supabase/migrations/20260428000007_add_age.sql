ALTER TABLE applications
  ADD COLUMN IF NOT EXISTS age int;

ALTER TABLE applications
  ADD CONSTRAINT chk_age CHECK (age IS NULL OR (age BETWEEN 20 AND 60));

COMMENT ON COLUMN applications.age IS '신청자 만 나이 (20–60)';
