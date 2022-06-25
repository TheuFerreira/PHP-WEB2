-- Active: 1656035943272@@127.0.0.1@3306@events
DROP SCHEMA IF EXISTS events;
CREATE SCHEMA events;

USE events;

CREATE TABLE users(
    id_user INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    fullname TEXT(100) NOT NULL,
    email TEXT(100) NOT NULL,
    password TEXT(50) NOT NULL
);

CREATE TABLE event(
    id_event INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    id_user INTEGER NOT NULL,
    title TEXT(100) NOT NULL,
    description TEXT(200) NOT NULL,
    local TEXT(20) NOT NULL,
    date DATETIME NOT NULL,
    created_at DATETIME NOT NULL,

    FOREIGN KEY (id_user) REFERENCES users (id_user)
);
