-- Expose the list of nickname elements already taken by applicants so the
-- public form can disable them. SECURITY DEFINER bypasses RLS but only
-- returns aggregated symbols (no PII).

CREATE OR REPLACE FUNCTION public.taken_elements()
RETURNS text[]
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT COALESCE(
    array_agg(DISTINCT sym) FILTER (WHERE sym IS NOT NULL),
    ARRAY[]::text[]
  )
  FROM (
    SELECT (regexp_match(ideal_type, '\[닉네임 원소\] ([^\n]*)'))[1] AS sym
    FROM applications
  ) t;
$$;

GRANT EXECUTE ON FUNCTION public.taken_elements() TO anon, authenticated;
