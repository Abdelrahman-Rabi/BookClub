CREATE DATABASE IF NOT EXISTS BookClub;

USE BookClub;

-----------------------------------
-- table Users
-----------------------------------
CREATE TABLE users (
    user_id INT UNIQUE NOT NULL AUTO_INCREMENT,
    role_id INT NOT NULL,
    username VARCHAR(50)  NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(60) NOT NULL,
    phone VARCHAR(255)  NOT NULL,
    created_time TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, username),
    FOREIGN KEY (role_id) REFERENCES roles (role_id)
);

-----------------------------------
-- table Users
-----------------------------------
CREATE TABLE roles (
    role_id INT UNIQUE NOT NULL AUTO_INCREMENT,
    type VARCHAR(20) NOT NULL,
    PRIMARY KEY (role_id)
);

