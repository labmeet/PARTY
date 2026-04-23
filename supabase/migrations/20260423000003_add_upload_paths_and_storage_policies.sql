ALTER TABLE applications
  ADD COLUMN IF NOT EXISTS photo_paths text[],
  ADD COLUMN IF NOT EXISTS verification_path text;

COMMENT ON COLUMN applications.photo_paths IS '신청자가 업로드한 본인 사진 경로 목록';
COMMENT ON COLUMN applications.verification_path IS '학생증/재학증명서/졸업증명서 업로드 경로';

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'storage'
      AND tablename = 'objects'
      AND policyname = 'anon_can_upload_application_photos'
  ) THEN
    CREATE POLICY "anon_can_upload_application_photos"
      ON storage.objects
      FOR INSERT
      TO anon
      WITH CHECK (bucket_id = 'application-photos');
  END IF;
END
$$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'storage'
      AND tablename = 'objects'
      AND policyname = 'anon_can_upload_application_verification'
  ) THEN
    CREATE POLICY "anon_can_upload_application_verification"
      ON storage.objects
      FOR INSERT
      TO anon
      WITH CHECK (bucket_id = 'application-verification');
  END IF;
END
$$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'storage'
      AND tablename = 'objects'
      AND policyname = 'service_role_full_access_application_photos'
  ) THEN
    CREATE POLICY "service_role_full_access_application_photos"
      ON storage.objects
      FOR ALL
      TO service_role
      USING (bucket_id = 'application-photos')
      WITH CHECK (bucket_id = 'application-photos');
  END IF;
END
$$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'storage'
      AND tablename = 'objects'
      AND policyname = 'service_role_full_access_application_verification'
  ) THEN
    CREATE POLICY "service_role_full_access_application_verification"
      ON storage.objects
      FOR ALL
      TO service_role
      USING (bucket_id = 'application-verification')
      WITH CHECK (bucket_id = 'application-verification');
  END IF;
END
$$;
