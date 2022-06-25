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
        SELECT e.id_event, e.id_user, e.title, e.description, e.local, e.date, COUNT(eu.id_user) AS count_peoples 
        FROM event AS e
        LEFT JOIN event_user AS eu ON eu.id_event = e.id_event
        GROUP BY e.id_event
        ORDER BY date ASC;
        ';

        $conn = $this->connection->getConnection();
        $query = $conn->prepare($sql);
        
        $query->execute();
        $rows = $query->fetchAll(PDO::FETCH_BOTH);
        
        return $rows;
    }
}

?>