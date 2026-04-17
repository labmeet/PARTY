ALTER TABLE applications
  ADD COLUMN deal_breaker text;

COMMENT ON COLUMN applications.deal_breaker IS '만나고 싶지 않은 사람 (선택 항목)';
 
