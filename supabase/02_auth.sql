-- Paso 7: tabla de usuarios para la autenticación
create table if not exists public.users (
  id            uuid primary key default gen_random_uuid(),
  email         text not null unique check (email = lower(email)),
  password_hash text not null,
  created_at    timestamptz not null default now()
);

-- Igual que tasks: tabla cerrada para la llave pública.
-- Solo nuestro servidor (secret key) puede leerla y escribirla.
alter table public.users enable row level security;
