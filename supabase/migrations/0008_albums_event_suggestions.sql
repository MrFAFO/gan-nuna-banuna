-- Themed photo albums + special event suggestions with optional RSVP.
-- Depends on 0005 (gallery_photos) and 0002 (notifications).

create table public.gallery_albums (
  id uuid primary key default gen_random_uuid(),
  daycare_id uuid not null references public.daycares(id) on delete cascade,
  title text not null,
  theme text not null,
  description text,
  cover_photo_id uuid references public.gallery_photos(id) on delete set null,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now()
);

create table public.gallery_album_photos (
  album_id uuid not null references public.gallery_albums(id) on delete cascade,
  photo_id uuid not null references public.gallery_photos(id) on delete cascade,
  sort_order int not null default 0,
  primary key (album_id, photo_id)
);

create index gallery_albums_daycare_id_idx on public.gallery_albums(daycare_id);

create table public.event_suggestions (
  id uuid primary key default gen_random_uuid(),
  daycare_id uuid not null references public.daycares(id) on delete cascade,
  title text not null,
  body text not null,
  suggestion_type text not null default 'event',
  event_date date,
  requires_rsvp boolean not null default false,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now()
);

create table public.event_suggestion_responses (
  suggestion_id uuid not null references public.event_suggestions(id) on delete cascade,
  profile_id uuid not null references public.profiles(id) on delete cascade,
  attending boolean not null,
  responded_at timestamptz not null default now(),
  primary key (suggestion_id, profile_id)
);

create index event_suggestions_daycare_id_idx on public.event_suggestions(daycare_id);

alter table public.gallery_albums enable row level security;
alter table public.gallery_album_photos enable row level security;
alter table public.event_suggestions enable row level security;
alter table public.event_suggestion_responses enable row level security;

create policy "members read daycare albums"
on public.gallery_albums for select
using (daycare_id = public.current_daycare_id());

create policy "teachers manage daycare albums"
on public.gallery_albums for all
using (
  daycare_id = public.current_daycare_id()
  and public.current_user_role() in ('teacher', 'admin')
)
with check (
  daycare_id = public.current_daycare_id()
  and public.current_user_role() in ('teacher', 'admin')
);

create policy "members read album photos"
on public.gallery_album_photos for select
using (
  exists (
    select 1 from public.gallery_albums a
    where a.id = album_id and a.daycare_id = public.current_daycare_id()
  )
);

create policy "teachers manage album photos"
on public.gallery_album_photos for all
using (
  public.current_user_role() in ('teacher', 'admin')
  and exists (
    select 1 from public.gallery_albums a
    where a.id = album_id and a.daycare_id = public.current_daycare_id()
  )
)
with check (
  public.current_user_role() in ('teacher', 'admin')
  and exists (
    select 1 from public.gallery_albums a
    where a.id = album_id and a.daycare_id = public.current_daycare_id()
  )
);

create policy "members read event suggestions"
on public.event_suggestions for select
using (daycare_id = public.current_daycare_id());

create policy "teachers manage event suggestions"
on public.event_suggestions for all
using (
  daycare_id = public.current_daycare_id()
  and public.current_user_role() in ('teacher', 'admin')
)
with check (
  daycare_id = public.current_daycare_id()
  and public.current_user_role() in ('teacher', 'admin')
);

create policy "parents manage own rsvp"
on public.event_suggestion_responses for all
using (profile_id = auth.uid())
with check (profile_id = auth.uid());

create policy "teachers read suggestion responses"
on public.event_suggestion_responses for select
using (
  public.current_user_role() in ('teacher', 'admin')
  and exists (
    select 1 from public.event_suggestions s
    where s.id = suggestion_id and s.daycare_id = public.current_daycare_id()
  )
);
