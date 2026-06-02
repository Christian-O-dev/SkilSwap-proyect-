-- Crea la base de datos principal del proyecto.
CREATE DATABASE IF NOT EXISTS skillswap_db
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE skillswap_db;

-- Guarda los roles disponibles del sistema.
CREATE TABLE IF NOT EXISTS roles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE
);

-- Guarda los usuarios registrados.
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  email VARCHAR(150) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role_id INT NOT NULL DEFAULT 2,
  is_blocked BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_users_role
    FOREIGN KEY (role_id) REFERENCES roles(id)
    ON UPDATE CASCADE
);

-- Guarda las habilidades publicadas por cada usuario.
CREATE TABLE IF NOT EXISTS skills (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  title VARCHAR(150) NOT NULL,
  description TEXT,
  category ENUM('Frontend', 'Backend', 'Design', 'Data') NOT NULL DEFAULT 'Frontend',
  level ENUM('Starter', 'Intermediate', 'Advanced') NOT NULL DEFAULT 'Starter',
  format ENUM('Online', 'Presencial') NOT NULL DEFAULT 'Online',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_skills_user
    FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

-- Guarda las solicitudes de intercambio sobre habilidades.
CREATE TABLE IF NOT EXISTS requests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  requester_id INT NOT NULL,
  skill_id INT NOT NULL,
  status ENUM('open', 'accepted', 'rejected') NOT NULL DEFAULT 'open',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_requests_user
    FOREIGN KEY (requester_id) REFERENCES users(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT fk_requests_skill
    FOREIGN KEY (skill_id) REFERENCES skills(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

-- Guarda el intercambio generado desde una solicitud aceptada.
CREATE TABLE IF NOT EXISTS exchanges (
  id INT AUTO_INCREMENT PRIMARY KEY,
  request_id INT NOT NULL UNIQUE,
  agreed_at TIMESTAMP NULL DEFAULT NULL,
  status ENUM('pending', 'completed', 'cancelled') NOT NULL DEFAULT 'pending',
  CONSTRAINT fk_exchanges_request
    FOREIGN KEY (request_id) REFERENCES requests(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

-- Guarda las valoraciones realizadas despues de un intercambio.
CREATE TABLE IF NOT EXISTS ratings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  exchange_id INT NOT NULL,
  rated_by INT NOT NULL,
  rated_to INT NOT NULL,
  score INT NOT NULL,
  comment TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_ratings_exchange
    FOREIGN KEY (exchange_id) REFERENCES exchanges(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT fk_ratings_rated_by
    FOREIGN KEY (rated_by) REFERENCES users(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT fk_ratings_rated_to
    FOREIGN KEY (rated_to) REFERENCES users(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT chk_ratings_score CHECK (score BETWEEN 1 AND 5),
  CONSTRAINT chk_ratings_users CHECK (rated_by <> rated_to),
  CONSTRAINT uq_rating_exchange_user UNIQUE (exchange_id, rated_by)
);

-- Inserta los roles base del sistema.
INSERT INTO roles (name)
VALUES ('admin'), ('user')
ON DUPLICATE KEY UPDATE name = VALUES(name);
