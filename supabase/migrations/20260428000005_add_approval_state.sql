-- Add approval_state column to applications
-- Two states: 'ready' (default, awaiting decision) | 'approved' (admin approved)

CREATE TYPE approval_state_type AS ENUM ('ready', 'approved');

ALTER TABLE applications
  ADD COLUMN approval_state approval_state_type NOT NULL DEFAULT 'ready';

CREATE INDEX idx_applications_approval_state ON applications (approval_state);

COMMENT ON COLUMN applications.approval_state IS 'ready(승인 대기) | approved(승인 완료). 기존 status와 별도로 관리되는 승인 단계 플래그.';
