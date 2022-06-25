<?php

namespace Repositories;

use Database\Connection;
use PDO;

class UsersRepository {
    private Connection $conn;

    function __construct() {
        $this->conn = new Connection();
    }

    public function getByEmailAndPassword($email, $password) {
        $sql = '
        SELECT id_user, fullname, email, password 
        FROM users
        WHERE BINARY email = ?
            AND BINARY password = ? 
        LIMIT 1;
        ';

        $connection = $this->conn->getConnection();
        $query = $connection->prepare($sql);

        $query->bindValue(1, $email);
        $query->bindValue(2, $password);

        $query->execute();
        $row = $query->fetch(PDO::FETCH_ASSOC);
        if ($row == false) {
            return null;
        }

        return $row;
    }

    public function insert($fullname, $email, $password) : bool {
        $sql = '
        INSERT INTO users (fullname, email, password)
        VALUES (?, ?, ?);
        ';

        $connection = $this->conn->getConnection();
        $query = $connection->prepare($sql);

        $query->bindValue(1, $fullname);
        $query->bindValue(2, $email);
        $query->bindValue(3, $password);

        $result = $query->execute();
        return $result;
    }

    public function checkExists($email) : bool {
        $sql = '
        SELECT COUNT(id_user) AS count 
        FROM users 
        WHERE BINARY email = ? 
        LIMIT 1;
        ';

        $connection = $this->conn->getConnection();
        $query = $connection->prepare($sql);
        
        $query->bindValue(1, $email);
        $query->execute();

        $result = $query->fetch(PDO::FETCH_ASSOC);
        $exists = $result['count'] > 0;
        return $exists; 
    }
}

?>