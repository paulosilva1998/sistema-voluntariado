CREATE DATABASE IF NOT EXISTS voluntariado_db;
USE voluntariado_db;

DROP TABLE IF EXISTS event_volunteers;
DROP TABLE IF EXISTS volunteers;
DROP TABLE IF EXISTS events;
DROP TABLE IF EXISTS users;

-- Tabela de usuários para login com JWT
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(100) NOT NULL,
  role ENUM('admin', 'user') DEFAULT 'user'
);

-- Tabela de eventos
CREATE TABLE events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  location VARCHAR(150) NOT NULL,
  max_volunteers INT NOT NULL DEFAULT 20
);

-- Tabela de voluntários
CREATE TABLE volunteers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  phone VARCHAR(20) NOT NULL,
  skills VARCHAR(200)
);

-- Relação n:n entre eventos e voluntários
CREATE TABLE event_volunteers (
  event_id INT NOT NULL,
  volunteer_id INT NOT NULL,
  registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (event_id, volunteer_id),
  FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
  FOREIGN KEY (volunteer_id) REFERENCES volunteers(id) ON DELETE CASCADE
);

-- Carga inicial de dados
INSERT INTO users (name, email, password, role) VALUES 
('Administrador', 'admin@ifrs.edu.br', '123456', 'admin'),
('Usuario Comum', 'comum@ifrs.edu.br', '123456', 'user');

INSERT INTO events (title, description, date, location, max_volunteers) VALUES 
('Campanha de Sangue', 'Coleta de sangue no campus', '2026-11-10', 'Bento Gonçalves', 2),
('Mutirão de Limpeza', 'Limpeza da praça central', '2026-11-15', 'Centro', 50);

INSERT INTO volunteers (name, email, phone, skills) VALUES 
('Carlos Souza', 'carlos@email.com', '54999991111', 'Enfermagem'),
('Mariana Lima', 'mariana@email.com', '54999992222', 'Organização e Logística');

INSERT INTO event_volunteers (event_id, volunteer_id) VALUES (1, 1);