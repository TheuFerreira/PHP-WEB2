<?php

namespace Repositories;

use Database\Connection;
use PDO;

class EventUserRepository {
    private Connection $connection;

    function __construct()
    {
        $this->connection = new Connection();
    }

    public function insert($idEvent, $idUser, $registeredAt) : bool {
        $sql = '
        INSERT INTO event_user VALUES (?, ?, ?);
        ';
        
        $conn = $this->connection->getConnection();
        $query = $conn->prepare($sql);
        
        $query->bindValue(1, $idEvent);
        $query->bindValue(2, $idUser);
        $query->bindValue(3, $registeredAt);

        $result = $query->execute();
        return $result;
    }

    public function checkUserIsInEvent($idEvent, $idUser) : bool {
        $sql = '
        SELECT COUNT(id_event) AS count
        FROM event_user
        WHERE id_event = ?
            AND id_user = ?;
        ';
        
        $conn = $this->connection->getConnection();
        $query = $conn->prepare($sql);
        
        $query->bindValue(1, $idEvent);
        $query->bindValue(2, $idUser);

        $query->execute();
        $row = $query->fetch(PDO::FETCH_ASSOC);
        $isInEvent = $row['count'] > 0;
        return $isInEvent;
    }
}

?>