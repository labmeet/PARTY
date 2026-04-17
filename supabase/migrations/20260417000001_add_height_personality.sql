ALTER TABLE applications
  ADD COLUMN height              smallint,
  ADD COLUMN personality_keywords text[];

COMMENT ON COLUMN applications.height               IS '키 (cm), 선택 항목';
COMMENT ON COLUMN applications.personality_keywords IS '성격 키워드 최대 3개';
