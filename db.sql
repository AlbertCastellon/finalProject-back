CREATE DATABASE final_project;
USE final_project;
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255),
    primer_apellido VARCHAR(255),
    email VARCHAR(255),
    username VARCHAR(255),
    password VARCHAR(255),
    isAdmin BOOLEAN
);

CREATE TABLE citas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fecha_hora TIMESTAMP,
    userId INT,
    FOREIGN KEY (userId) REFERENCES users(id)
);

CREATE TABLE comentarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    coment TEXT,
    userId INT,
    FOREIGN KEY (userId) REFERENCES users(id)
)