alter table public.post_mortems enable row level security;

create policy "Owners read" on public.post_mortems
for select using (auth.uid() = user_id);

create policy "Owners insert" on public.post_mortems
for insert with check (auth.uid() = user_id);

create policy "Owners update" on public.post_mortems
for update using (auth.uid() = user_id);

create policy "Owners delete" on public.post_mortems
for delete using (auth.uid() = user_id);