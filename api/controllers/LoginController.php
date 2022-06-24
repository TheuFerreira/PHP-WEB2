<?php

namespace Controllers;

use Database\Connection;
use Errors\NotFoundException;
use PDO;

class LoginController {
    private Connection $conn;

    function __construct() {
        $this->conn = new Connection();
    }

    public function signIn($email, $password) {
        $connection = $this->conn->getConnection();

        $sql = '
        SELECT id_user, fullname, email, password 
        FROM users
        WHERE BINARY email = ?
            AND BINARY password = ? 
        LIMIT 1;
        ';
        $query = $connection->prepare($sql);
        $query->bindValue(1, $email);
        $query->bindValue(2, $password);
        $query->execute();

        $row = $query->fetch(PDO::FETCH_ASSOC);
        if ($row == false) {
            throw new NotFoundException();
        }

        $json = json_encode($row);
        return $json;
    }

}

?>