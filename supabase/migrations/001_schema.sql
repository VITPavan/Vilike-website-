-- VILIKE FAB TECH — full schema with RLS

create type user_role as enum ('customer', 'admin');
create type order_status as enum (
  'inquiry', 'confirmed', 'under_production', 'shipped_from_xiamen',
  'in_transit', 'in_chennai_port', 'customs_clearance', 'delivered'
);

create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role user_role not null default 'customer',
  full_name text,
  company text,
  phone text
);

create table customers (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references profiles(id),
  company text,
  phone text,
  email text,
  created_at timestamptz default now()
);

create table machines (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  model_name text not null,
  category text,
  price numeric not null,
  specs jsonb,
  images jsonb,
  hero_image text,
  delivery_days int,
  featured boolean default false,
  prominent_customer text,
  engineering jsonb,
  hotspots jsonb
);

create table machine_components (
  id uuid primary key default gen_random_uuid(),
  machine_id uuid references machines(id) on delete cascade,
  part_name text not null,
  image_url text,
  description text,
  origin_country text
);

create table orders (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references customers(id),
  machine_id uuid references machines(id),
  status order_status default 'inquiry',
  amount_paid numeric default 0,
  total_amount numeric not null,
  delivery_address text,
  warranty_until date,
  duty_amount numeric,
  gst_paid numeric,
  lc_reference text,
  banking_notes text,
  finance_bank text,
  finance_option text,
  emi_months int,
  origin_port text default 'Xiamen',
  msn_tracking_number text,
  vessel_name text,
  eta_chennai date,
  last_tracking_event text,
  last_tracking_at timestamptz,
  tracking_events jsonb,
  crane_required boolean default false,
  crane_notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table order_documents (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references orders(id) on delete cascade,
  label text not null,
  file_url text not null
);

create table reviews (
  id uuid primary key default gen_random_uuid(),
  machine_id uuid references machines(id) on delete cascade,
  company_name text,
  customer_name text,
  review_text text,
  rating int check (rating between 1 and 5),
  featured boolean default false,
  created_at timestamptz default now()
);

create table cloth_samples (
  id uuid primary key default gen_random_uuid(),
  name text,
  image_url text,
  machine_id uuid references machines(id),
  description text
);

create table financing_options (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  min_down_pct int,
  max_tenure_months int,
  interest_range text,
  partner_bank text,
  sort_order int default 0
);

create table eligibility_leads (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references profiles(id),
  machine_id uuid references machines(id),
  annual_turnover numeric,
  existing_loans numeric,
  down_payment_pct int,
  tenure_months int,
  machine_price numeric,
  recommended_option_id uuid references financing_options(id),
  created_at timestamptz default now()
);

create table services (
  id uuid primary key default gen_random_uuid(),
  type text,
  title text not null,
  description text,
  contact_phone text
);

-- RLS
alter table profiles enable row level security;
alter table customers enable row level security;
alter table machines enable row level security;
alter table orders enable row level security;
alter table reviews enable row level security;
alter table cloth_samples enable row level security;
alter table financing_options enable row level security;
alter table services enable row level security;
alter table order_documents enable row level security;
alter table eligibility_leads enable row level security;

create policy "Public read machines" on machines for select using (true);
create policy "Public read reviews" on reviews for select using (true);
create policy "Public read cloth_samples" on cloth_samples for select using (true);
create policy "Public read financing" on financing_options for select using (true);
create policy "Public read services" on services for select using (true);

create policy "Users read own profile" on profiles for select using (auth.uid() = id);
create policy "Users update own profile" on profiles for update using (auth.uid() = id);

create policy "Customers read own row" on customers for select
  using (profile_id = auth.uid());

create policy "Customers read own orders" on orders for select
  using (
    customer_id in (select id from customers where profile_id = auth.uid())
  );

create policy "Customers read own documents" on order_documents for select
  using (
    order_id in (
      select o.id from orders o
      join customers c on c.id = o.customer_id
      where c.profile_id = auth.uid()
    )
  );

create policy "Admin all orders" on orders for all
  using (
    exists (select 1 from profiles where id = auth.uid() and role = 'admin')
  );

create policy "Admin all customers" on customers for all
  using (
    exists (select 1 from profiles where id = auth.uid() and role = 'admin')
  );

create policy "Anyone insert eligibility" on eligibility_leads for insert with check (true);
create policy "Admin read eligibility" on eligibility_leads for select
  using (
    exists (select 1 from profiles where id = auth.uid() and role = 'admin')
  );

create policy "Admin machines write" on machines for all
  using (
    exists (select 1 from profiles where id = auth.uid() and role = 'admin')
  );
