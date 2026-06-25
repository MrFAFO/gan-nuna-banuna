-- Allow teachers (not only admin) to complete the setup wizard and manage branding.
-- The gannenet often has role = teacher; setup gate opens for teacher + admin.

create policy "teachers update their daycare"
on public.daycares for update
using (
  id = public.current_daycare_id()
  and public.current_user_role() = 'teacher'
)
with check (
  id = public.current_daycare_id()
  and public.current_user_role() = 'teacher'
);

create policy "teachers manage daycare settings"
on public.daycare_settings for all
using (
  daycare_id = public.current_daycare_id()
  and public.current_user_role() = 'teacher'
)
with check (
  daycare_id = public.current_daycare_id()
  and public.current_user_role() = 'teacher'
);

create policy "teachers manage daycare heroes"
on public.daycare_hero_images for all
using (
  daycare_id = public.current_daycare_id()
  and public.current_user_role() = 'teacher'
)
with check (
  daycare_id = public.current_daycare_id()
  and public.current_user_role() = 'teacher'
);

create policy "teachers upload daycare branding"
on storage.objects for insert
with check (
  bucket_id = 'daycare-branding'
  and public.current_user_role() = 'teacher'
  and (storage.foldername(name))[1] = public.current_daycare_id()::text
);

create policy "teachers update daycare branding storage"
on storage.objects for update
using (
  bucket_id = 'daycare-branding'
  and public.current_user_role() = 'teacher'
  and (storage.foldername(name))[1] = public.current_daycare_id()::text
);

create policy "teachers delete daycare branding storage"
on storage.objects for delete
using (
  bucket_id = 'daycare-branding'
  and public.current_user_role() = 'teacher'
  and (storage.foldername(name))[1] = public.current_daycare_id()::text
);
