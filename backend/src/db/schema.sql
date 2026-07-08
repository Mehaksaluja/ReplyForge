create table users (
  id uuid primary key default gen_random_uuid(),
  google_sub text unique not null,
  email text not null,
  free_replies_used int not null default 0,
  payment_customer_id text,
  subscription_status text not null default 'free', -- 'free' | 'active' | 'canceled'
  created_at timestamptz not null default now()
);
