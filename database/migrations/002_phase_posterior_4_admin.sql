USE skillswap_db;

ALTER TABLE users
  ADD COLUMN IF NOT EXISTS is_blocked BOOLEAN NOT NULL DEFAULT FALSE AFTER role_id;


USE skillswap_db;

INSERT INTO users (username, email, password, role_id, is_blocked)
VALUES (
  'admin_root',
  'admin_root@skillswap.local',
  '$2b$10$A13uzRydDnJ6qiSBHlte.e1JCLQrop5PrUVEk/Iptn353QP3SpZpy',
  1,
  0
);