
CREATE TABLE deals_users (
  id SERIAL PRIMARY KEY,
  user_name TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
);

ALTER TABLE deals_table
  ADD COLUMN
    user_id INTEGER REFERENCES deals_users(id)
    ON DELETE SET NULL;
