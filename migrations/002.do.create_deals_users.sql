
CREATE TABLE deals_users (
  id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  user_name TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
);

ALTER TABLE deals_table
  ADD COLUMN
    user_id INTEGER REFERENCES deals_users(id)
    ON DELETE SET NULL;
