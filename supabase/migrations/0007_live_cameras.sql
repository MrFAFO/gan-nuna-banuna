-- Live cameras: metadata, parent consent, access audit.
-- Depends on 0001–0006. Stream URLs are issued via get-camera-stream edge function.

create table public.cameras (
  id uuid primary key default gen_random_uuid(),
  daycare_id uuid not null references public.daycares(id) on delete cascade,
  name text not null,
  location text,
  stream_provider text not null default 'demo',
  stream_external_id text,
  is_enabled boolean not null default false,
  schedule_json jsonb not null default '{"timezone":"Asia/Jerusalem","days":[0,1,2,3,4,5],"startTime":"08:00","endTime":"16:00"}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index cameras_daycare_id_idx on public.cameras(daycare_id);

create table public.camera_consents (
  profile_id uuid not null references public.profiles(id) on delete cascade,
  daycare_id uuid not null references public.daycares(id) on delete cascade,
  consented_at timestamptz not null default now(),
  primary key (profile_id, daycare_id)
);

create table public.camera_access_logs (
  id uuid primary key default gen_random_uuid(),
  camera_id uuid not null references public.cameras(id) on delete cascade,
  profile_id uuid not null references public.profiles(id) on delete cascade,
  accessed_at timestamptz not null default now()
);

create index camera_access_logs_camera_id_idx on public.camera_access_logs(camera_id);

alter table public.cameras enable row level security;
alter table public.camera_consents enable row level security;
alter table public.camera_access_logs enable row level security;

-- Parents: enabled cameras in their daycare only
create policy "parents read enabled daycare cameras"
on public.cameras for select
using (
  daycare_id = public.current_daycare_id()
  and is_enabled = true
  and public.current_user_role() = 'parent'
);

-- Teachers/admins: full CRUD for their daycare
create policy "teachers manage daycare cameras"
on public.cameras for all
using (
  daycare_id = public.current_daycare_id()
  and public.current_user_role() in ('teacher', 'admin')
)
with check (
  daycare_id = public.current_daycare_id()
  and public.current_user_role() in ('teacher', 'admin')
);

create policy "users manage own camera consent"
on public.camera_consents for all
using (profile_id = auth.uid())
with check (profile_id = auth.uid());

create policy "teachers read daycare camera consents"
on public.camera_consents for select
using (
  daycare_id = public.current_daycare_id()
  and public.current_user_role() in ('teacher', 'admin')
);

create policy "users insert own access logs"
on public.camera_access_logs for insert
with check (profile_id = auth.uid());

create policy "teachers read daycare access logs"
on public.camera_access_logs for select
using (
  public.current_user_role() in ('teacher', 'admin')
  and exists (
    select 1 from public.cameras c
    where c.id = camera_id and c.daycare_id = public.current_daycare_id()
  )
);

-- Pilot seed: one disabled demo camera (teacher enables after HLS URL configured)
insert into public.cameras (id, daycare_id, name, location, stream_provider, stream_external_id, is_enabled)
values (
  'c1000000-0000-0000-0000-000000000001',
  '11111111-1111-1111-1111-111111111111',
  'חדר פעילות',
  'חדר משחקים',
  'demo',
  null,
  false
)
on conflict (id) do nothing;
