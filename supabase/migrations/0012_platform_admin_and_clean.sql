-- Step 2 of 2: RLS, clean pilot data, reset Nuna shell.
-- Run after 0011_platform_admin_enum.sql in a NEW SQL Editor query (separate Run).

do $$
begin
  if not exists (
    select 1
    from pg_enum e
    join pg_type t on e.enumtypid = t.oid
    join pg_namespace n on t.typnamespace = n.oid
    where n.nspname = 'public'
      and t.typname = 'user_role'
      and e.enumlabel = 'platform_admin'
  ) then
    raise exception
      'Missing enum value platform_admin. Run 0011_platform_admin_enum.sql first, click Run, then run this file in a new query.';
  end if;
end $$;

create or replace function public.is_platform_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role::text = 'platform_admin'
  )
$$;

drop policy if exists "platform admins read all daycares" on public.daycares;
create policy "platform admins read all daycares"
on public.daycares for select
using (public.is_platform_admin());

-- Admin-only branding (undo 0010 teacher policies)
drop policy if exists "teachers update their daycare" on public.daycares;
drop policy if exists "teachers manage daycare settings" on public.daycare_settings;
drop policy if exists "teachers manage daycare heroes" on public.daycare_hero_images;
drop policy if exists "teachers upload daycare branding" on storage.objects;
drop policy if exists "teachers update daycare branding storage" on storage.objects;
drop policy if exists "teachers delete daycare branding storage" on storage.objects;

-- Clean pilot seed data — keep empty Nuna Banuna shell
do $$
declare
  pilot_id uuid := '11111111-1111-1111-1111-111111111111';
begin
  delete from public.event_suggestion_responses
  where suggestion_id in (
    select id from public.event_suggestions where daycare_id = pilot_id
  );

  delete from public.event_suggestions where daycare_id = pilot_id;
  delete from public.gallery_album_photos
  where album_id in (select id from public.gallery_albums where daycare_id = pilot_id);
  delete from public.gallery_albums where daycare_id = pilot_id;
  delete from public.gallery_photos where daycare_id = pilot_id;

  delete from public.camera_access_logs
  where camera_id in (select id from public.cameras where daycare_id = pilot_id);
  delete from public.camera_consents where daycare_id = pilot_id;
  delete from public.cameras where daycare_id = pilot_id;

  delete from public.contact_messages where daycare_id = pilot_id;
  delete from public.absence_reports where daycare_id = pilot_id;

  delete from public.push_tokens
  where profile_id in (select id from public.profiles where role = 'parent');

  delete from public.messages
  where thread_id in (select id from public.message_threads where daycare_id = pilot_id);
  delete from public.message_threads where daycare_id = pilot_id;

  delete from public.notifications where daycare_id = pilot_id;
  delete from public.calendar_events where daycare_id = pilot_id;

  delete from public.daily_notes
  where report_id in (select id from public.daily_reports where daycare_id = pilot_id);
  delete from public.daily_meals
  where report_id in (select id from public.daily_reports where daycare_id = pilot_id);
  delete from public.daily_activities
  where report_id in (select id from public.daily_reports where daycare_id = pilot_id);
  delete from public.daily_reports where daycare_id = pilot_id;

  delete from public.attendance_records where daycare_id = pilot_id;
  delete from public.contracts where daycare_id = pilot_id;
  delete from public.child_guardians
  where child_id in (select id from public.children where daycare_id = pilot_id);

  update public.guardians set profile_id = null where daycare_id = pilot_id;
  delete from public.guardians where daycare_id = pilot_id;
  delete from public.children where daycare_id = pilot_id;
  delete from public.daycare_hero_images where daycare_id = pilot_id;

  delete from public.profiles where role = 'parent';
end $$;

-- Storage files cannot be deleted via SQL on Supabase (use Dashboard instead):
-- Storage → contracts / gallery / daycare-branding → empty each bucket if needed.

update public.daycare_settings
set
  owner_name = 'נונה',
  tagline = 'כל מה שהגננת וההורים צריכים, במקום אחד',
  subtitle = 'האפליקציה האישית של הגן',
  primary_color = '#7A9A72',
  secondary_color = '#F4D6C6',
  background_color = '#FFF8F1',
  card_background_color = '#FFFFFF',
  text_primary_color = '#26382E',
  text_secondary_color = '#6B6B6B',
  support_phone = '03-1234567',
  support_email = 'info@gan-nuna.co.il',
  logo_url = null,
  setup_completed = false,
  setup_completed_at = null,
  updated_at = now()
where daycare_id = '11111111-1111-1111-1111-111111111111';

insert into public.daycare_settings (
  daycare_id,
  owner_name,
  tagline,
  subtitle,
  primary_color,
  secondary_color,
  background_color,
  card_background_color,
  text_primary_color,
  text_secondary_color,
  support_phone,
  support_email,
  setup_completed
)
values (
  '11111111-1111-1111-1111-111111111111',
  'נונה',
  'כל מה שהגננת וההורים צריכים, במקום אחד',
  'האפליקציה האישית של הגן',
  '#7A9A72',
  '#F4D6C6',
  '#FFF8F1',
  '#FFFFFF',
  '#26382E',
  '#6B6B6B',
  '03-1234567',
  'info@gan-nuna.co.il',
  false
)
on conflict (daycare_id) do nothing;

update public.profiles
set role = 'admin'
where daycare_id = '11111111-1111-1111-1111-111111111111'
  and role = 'teacher';
