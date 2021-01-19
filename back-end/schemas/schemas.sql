CREATE DATABASE IF NOT EXISTS book_club;

USE book_club;

-----------------------------------
-- table Roles
-----------------------------------
CREATE TABLE roles (
    role_id INT UNIQUE NOT NULL AUTO_INCREMENT,
    role VARCHAR(20) NOT NULL,
    PRIMARY KEY (role_id)
);

-----------------------------------
-- table Users
-----------------------------------
CREATE TABLE users (
    user_id INT UNIQUE NOT NULL AUTO_INCREMENT,
    role VARCHAR(20) NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    displayName VARCHAR (50) NOT NULL,
    created_time TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id),
    FOREIGN KEY (role) REFERENCES roles (role)
);

-----------------------------------
-- table Post
-----------------------------------
CREATE TABLE post
(
  post_id INT UNIQUE NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  description VARCHAR(250) NOT NULL,
  likeCounter INT (20),
  PRIMARY KEY (post_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-----------------------------------
-- table Book List
-----------------------------------
CREATE TABLE book_list
(
  book_list_id INT UNIQUE NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  reading INT (25),
  have_read INT (25),
  to_read INT (25),
  PRIMARY KEY (book_list_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);