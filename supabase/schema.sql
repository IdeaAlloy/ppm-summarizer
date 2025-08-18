-- Enable UUID
create extension if not exists "uuid-ossp";

create table if not exists public.post_mortems (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  project text,
  title text not null,
  raw_notes text not null,
  summary text,
  timeline text,
  root_causes text[] default '{}',
  wins text[] default '{}',
  lessons text[] default '{}',
  action_items jsonb default '[]'::jsonb,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

create index if not exists post_mortems_user_id_idx on public.post_mortems(user_id);
create index if not exists post_mortems_project_idx on public.post_mortems(project);

create function public.touch_updated_at() returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end; $$;

create trigger set_updated_at before update on public.post_mortems
for each row execute procedure public.touch_updated_at();