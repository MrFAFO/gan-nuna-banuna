-- Step 1 of 2: add platform_admin to user_role enum.
-- Run THIS FILE ALONE in SQL Editor → click Run → wait for success.
-- Then open a NEW query and run 0012_platform_admin_and_clean.sql.

alter type public.user_role add value if not exists 'platform_admin';

-- Verify (should show platform_admin in the list):
-- select e.enumlabel
-- from pg_enum e
-- join pg_type t on e.enumtypid = t.oid
-- where t.typname = 'user_role'
-- order by e.enumsortorder;
