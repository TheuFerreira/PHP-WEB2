<?php

namespace Repositories;

use Database\Connection;
use PDO;

class PlaceRepository {

    private Connection $connection;

    function __construct()
    {
        $this->connection = new Connection();
    }

    public function insert($description) : bool {
        $sql = '
        INSERT INTO place (description) 
        VALUES (?);
        ';
        
        $conn = $this->connection->getConnection();
        $query = $conn->prepare($sql);

        $query->bindValue(1, $description);
        $result = $query->execute();
        return $result;
    }

    public function getAll() {
        $sql = '
        SELECT id_place, description
        FROM place
        ORDER BY description ASC;
        ';

        $conn = $this->connection->getConnection();
        $query = $conn->prepare($sql);
        
        $query->execute();
        $result = $query->fetchAll(PDO::FETCH_BOTH);
        return $result;
    }

}

?>