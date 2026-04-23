INSERT INTO storage.buckets (id, name, public)
SELECT 'application-photos', 'application-photos', false
WHERE NOT EXISTS (
  SELECT 1 FROM storage.buckets WHERE id = 'application-photos'
);

INSERT INTO storage.buckets (id, name, public)
SELECT 'application-verification', 'application-verification', false
WHERE NOT EXISTS (
  SELECT 1 FROM storage.buckets WHERE id = 'application-verification'
);
