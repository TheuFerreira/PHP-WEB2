<?php

namespace Repositories;

use Database\Connection;
use PDO;

class EventRepository {
    private Connection $connection;

    function __construct()
    {
        $this->connection = new Connection();
    }

    public function getAll() {
        $sql = '
        SELECT e.id_event, e.id_user, e.title, e.description, e.id_place, e.date, COUNT(eu.id_user) AS count_peoples 
        FROM event AS e
        LEFT JOIN event_user AS eu ON eu.id_event = e.id_event
        GROUP BY e.id_event
        ORDER BY date DESC;
        ';

        $conn = $this->connection->getConnection();
        $query = $conn->prepare($sql);
        
        $query->execute();
        $rows = $query->fetchAll(PDO::FETCH_BOTH);
        
        return $rows;
    }

    public function insert($idUser, $title, $description, $idPlace, $date, $createdAt) : bool {
        $sql = '
        INSERT INTO event (id_user, title, description, id_place, date, created_at)
        VALUES (?, ?, ?, ?, ?, ?);
        ';

        $connection = $this->connection->getConnection();
        $query = $connection->prepare($sql);

        $query->bindValue(1, $idUser);
        $query->bindValue(2, $title);
        $query->bindValue(3, $description);
        $query->bindValue(4, $idPlace);
        $query->bindValue(5, $date);
        $query->bindValue(6, $createdAt);

        $result = $query->execute();
        return $result;
    }

    public function getAllByUser($idUser) {
        $sql = '
        SELECT e.id_event, e.id_user, e.title, e.description, e.id_place, e.date, COUNT(eu.id_user) AS count_peoples 
        FROM event AS e
        LEFT JOIN event_user AS eu ON eu.id_event = e.id_event
        WHERE e.id_user = ?
        GROUP BY e.id_event
        ORDER BY e.date DESC;
        ';

        $conn = $this->connection->getConnection();
        $query = $conn->prepare($sql);
        
        $query->bindValue(1, $idUser);
        $query->execute();
        $rows = $query->fetchAll(PDO::FETCH_BOTH);
        
        return $rows;
    }

    public function getAllEnteredEvents($idUser) {
        $sql = '
        SELECT e.id_event, e.id_user, e.title, e.description, e.id_place, e.date, COUNT(eu.id_user) AS count_peoples 
        FROM event AS e
        LEFT JOIN event_user AS eu ON eu.id_event = e.id_event
        WHERE eu.id_user = ?
        GROUP BY e.id_event
        ORDER BY e.date DESC;
        ';

        $conn = $this->connection->getConnection();
        $query = $conn->prepare($sql);
        
        $query->bindValue(1, $idUser);
        $query->execute();
        $rows = $query->fetchAll(PDO::FETCH_BOTH);
        
        return $rows;
    }
}

?>