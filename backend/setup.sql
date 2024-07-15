CREATE TABLE IF NOT EXISTS "users" (
  id SERIAL PRIMARY KEY,
  username text,
  "password" text
);

CREATE TABLE IF NOT EXISTS "sets" (
  id SERIAL PRIMARY KEY,
  "owner" integer REFERENCES users(id),
  "name" text,
  "description" text,
  terms json
);

