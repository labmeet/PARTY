-- Email is no longer required on the application form.
-- Make the column nullable and drop the unique + format constraints.

ALTER TABLE applications
  ALTER COLUMN email DROP NOT NULL;

ALTER TABLE applications
  DROP CONSTRAINT IF EXISTS uq_email;

ALTER TABLE applications
  DROP CONSTRAINT IF EXISTS chk_email;
