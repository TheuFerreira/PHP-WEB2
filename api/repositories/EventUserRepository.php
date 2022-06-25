<?php

namespace Repositories;

use Database\Connection;

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
}

?>