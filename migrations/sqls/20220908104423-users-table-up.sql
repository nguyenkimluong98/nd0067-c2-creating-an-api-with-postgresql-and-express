CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  firstname VARCHAR(32) NOT NULL,
  lastname VARCHAR(32) NOT NULL,
  username VARCHAR(32) NOT NULL,
  password VARCHAR(64) NOT NULL
);