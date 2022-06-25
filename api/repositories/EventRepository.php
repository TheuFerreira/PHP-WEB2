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
        SELECT id_event, id_user, title, description, local, date 
        FROM event
        ORDER BY date ASC
        ';

        $conn = $this->connection->getConnection();
        $query = $conn->prepare($sql);
        
        $query->execute();
        $rows = $query->fetchAll(PDO::FETCH_BOTH);
        
        return $rows;
    }
}

?>