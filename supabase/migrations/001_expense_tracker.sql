create table public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  owner_id uuid not null references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

create index organizations_owner_id_idx on public.organizations (owner_id);

alter table public.organizations enable row level security;

create policy "organizations_select_own"
  on public.organizations for select
  using (auth.uid() = owner_id);

create policy "organizations_insert_own"
  on public.organizations for insert
  with check (auth.uid() = owner_id);

create policy "organizations_update_own"
  on public.organizations for update
  using (auth.uid() = owner_id)
  with check (auth.uid() = owner_id);

create policy "organizations_delete_own"
  on public.organizations for delete
  using (auth.uid() = owner_id);

create table public.expenses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  amount numeric(14, 2) not null check (amount >= 0),
  category text,
  created_at timestamptz not null default now(),
  organization_id uuid not null references public.organizations (id) on delete cascade
);

create index expenses_organization_id_idx on public.expenses (organization_id);
create index expenses_org_created_at_idx on public.expenses (organization_id, created_at desc);

alter table public.expenses enable row level security;

create policy "expenses_select_own_org"
  on public.expenses for select
  using (
    exists (
      select 1
      from public.organizations o
      where o.id = expenses.organization_id
        and o.owner_id = auth.uid()
    )
  );

create policy "expenses_insert_own_org"
  on public.expenses for insert
  with check (
    exists (
      select 1
      from public.organizations o
      where o.id = organization_id
        and o.owner_id = auth.uid()
    )
  );

create policy "expenses_update_own_org"
  on public.expenses for update
  using (
    exists (
      select 1
      from public.organizations o
      where o.id = expenses.organization_id
        and o.owner_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1
      from public.organizations o
      where o.id = organization_id
        and o.owner_id = auth.uid()
    )
  );

create policy "expenses_delete_own_org"
  on public.expenses for delete
  using (
    exists (
      select 1
      from public.organizations o
      where o.id = expenses.organization_id
        and o.owner_id = auth.uid()
    )
  );
