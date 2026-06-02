USE skillswap_db;

ALTER TABLE skills
  ADD COLUMN IF NOT EXISTS category ENUM('Frontend', 'Backend', 'Design', 'Data') NOT NULL DEFAULT 'Frontend' AFTER description,
  ADD COLUMN IF NOT EXISTS level ENUM('Starter', 'Intermediate', 'Advanced') NOT NULL DEFAULT 'Starter' AFTER category,
  ADD COLUMN IF NOT EXISTS format ENUM('Online', 'Presencial') NOT NULL DEFAULT 'Online' AFTER level;
