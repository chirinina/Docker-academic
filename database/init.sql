CREATE DATABASE IF NOT EXISTS cv_db;
USE cv_db;

CREATE TABLE IF NOT EXISTS persona (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    ciudad VARCHAR(100) NOT NULL,
    foto VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS formacion (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    institucion VARCHAR(255) NOT NULL,
    anio VARCHAR(50) NOT NULL,
    persona_id INT,
    FOREIGN KEY (persona_id) REFERENCES persona(id)
);

-- Insertar datos iniciales
INSERT INTO persona (nombre, apellido, ciudad, foto) VALUES 
('Efrain', 'Chiri Nina', 'Sucre - Bolivia', '/Foto 4x4.png');

INSERT INTO formacion (titulo, institucion, anio, persona_id) VALUES 
('Tecnico Superior Sistemas Informaticos', 'Instituto Tecnico CCA Corporacion Cibernetica Americana', '2024', 1),
('Diplomado Full Stack Developer  Backend, Frontend y USIP', 'Universidad de Simon I Patiño', '2026', 1);
