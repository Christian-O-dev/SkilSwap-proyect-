USE defaultdb;

INSERT INTO roles (name)
VALUES ('admin'), ('user')
ON DUPLICATE KEY UPDATE name = VALUES(name);

INSERT INTO users (username, email, password, role_id, is_blocked)
VALUES
  (
    'ana_dev',
    'ana_dev@skillswap.demo',
    '$2b$10$mQF/QW7YKD3ha9CAwE5W5unfdEXFGRgDwXBUtUg6Br6aGfg/WPjnW',
    (SELECT id FROM roles WHERE name = 'user'),
    0
  ),
  (
    'carlos_data',
    'carlos_data@skillswap.demo',
    '$2b$10$mQF/QW7YKD3ha9CAwE5W5unfdEXFGRgDwXBUtUg6Br6aGfg/WPjnW',
    (SELECT id FROM roles WHERE name = 'user'),
    0
  ),
  (
    'admin_demo',
    'admin_demo@skillswap.demo',
    '$2b$10$mQF/QW7YKD3ha9CAwE5W5unfdEXFGRgDwXBUtUg6Br6aGfg/WPjnW',
    (SELECT id FROM roles WHERE name = 'admin'),
    0
  )
ON DUPLICATE KEY UPDATE
  password = VALUES(password),
  role_id = VALUES(role_id),
  is_blocked = 0;

INSERT INTO skills (user_id, title, description, category, level, format)
SELECT id, 'React desde cero', 'Aprende componentes, props, estado y rutas con React.', 'Frontend', 'Starter', 'Online'
FROM users
WHERE username = 'ana_dev'
  AND NOT EXISTS (SELECT 1 FROM skills WHERE title = 'React desde cero');

INSERT INTO skills (user_id, title, description, category, level, format)
SELECT id, 'Maquetacion responsive', 'Practica layouts adaptables con HTML, CSS y buenas bases de UI.', 'Design', 'Intermediate', 'Online'
FROM users
WHERE username = 'ana_dev'
  AND NOT EXISTS (SELECT 1 FROM skills WHERE title = 'Maquetacion responsive');

INSERT INTO skills (user_id, title, description, category, level, format)
SELECT id, 'Node.js y Express', 'Crea APIs REST con rutas, controladores y conexion a MySQL.', 'Backend', 'Intermediate', 'Online'
FROM users
WHERE username = 'ana_dev'
  AND NOT EXISTS (SELECT 1 FROM skills WHERE title = 'Node.js y Express');

INSERT INTO skills (user_id, title, description, category, level, format)
SELECT id, 'SQL practico', 'Consultas, relaciones, filtros y joins para proyectos reales.', 'Data', 'Starter', 'Online'
FROM users
WHERE username = 'carlos_data'
  AND NOT EXISTS (SELECT 1 FROM skills WHERE title = 'SQL practico');

INSERT INTO skills (user_id, title, description, category, level, format)
SELECT id, 'Dashboards con datos', 'Organiza metricas y visualiza informacion de forma clara.', 'Data', 'Intermediate', 'Presencial'
FROM users
WHERE username = 'carlos_data'
  AND NOT EXISTS (SELECT 1 FROM skills WHERE title = 'Dashboards con datos');

INSERT INTO skills (user_id, title, description, category, level, format)
SELECT id, 'Git y GitHub para equipos', 'Flujo de ramas, commits, pull requests y buenas practicas.', 'Backend', 'Starter', 'Online'
FROM users
WHERE username = 'carlos_data'
  AND NOT EXISTS (SELECT 1 FROM skills WHERE title = 'Git y GitHub para equipos');
