-- Active: 1656337401223@@127.0.0.1@3306@events
DROP SCHEMA IF EXISTS events;
CREATE SCHEMA events;

USE events;

CREATE TABLE users(
    id_user INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    fullname TEXT(100) NOT NULL,
    email TEXT(100) NOT NULL,
    password TEXT(50) NOT NULL
);

CREATE TABLE place(
    id_place INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    description VARCHAR(100) NOT NULL
);

CREATE TABLE event(
    id_event INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    id_user INTEGER NOT NULL,
    id_place INTEGER NOT NULL,
    title TEXT(100) NOT NULL,
    description TEXT(200) NOT NULL,
    date DATETIME NOT NULL,
    created_at DATETIME NOT NULL,

    FOREIGN KEY (id_user) REFERENCES users (id_user),
    FOREIGN KEY (id_place) REFERENCES place (id_place) 
);

CREATE TABLE event_user(
    id_event INTEGER NOT NULL,
    id_user INTEGER NOT NULL,
    registered_at DATETIME NOT NULL,

    PRIMARY KEY (id_event, id_user),
    FOREIGN KEY (id_event) REFERENCES event (id_event),
    FOREIGN KEY (id_user) REFERENCES users (id_user)
);
