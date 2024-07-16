CREATE TABLE IF NOT EXISTS "users" (
  id SERIAL PRIMARY KEY,
  username text,
  "password" text,
  created_at timestamp
);

CREATE TABLE IF NOT EXISTS "sets" (
  id SERIAL PRIMARY KEY,
  "owner" integer REFERENCES users(id) ON DELETE CASCADE,
  "name" text,
  "description" text,
  created_at timestamp
);

-- DAta = json with 2 arrays, definition and answers
CREATE TABLE IF NOT EXISTS "terms" (
  term_id SERIAL PRIMARY KEY,
  set_id integer REFERENCES sets(id) ON DELETE CASCADE,
  "data" json,
  created_at timestamp
);


-- Data = Json with times right, wrong, timestamp
CREATE TABLE IF NOT EXISTS "termdata"(
  id SERIAL PRIMARY KEY,
  user_id integer REFERENCES users(id) ON DELETE CASCADE,
  term_id integer REFERENCES terms(term_id) ON DELETE CASCADE,
  "data" json
);