<?php

namespace Database;

use PDO;

class Connection {
    public function getConnection() : PDO {
        $fileData = file_get_contents('./appsettings.json');
        $jsonFile = json_decode($fileData);

        $host = $jsonFile->host;
        $port = $jsonFile->port;
        $dbname = $jsonFile->dbname;
        $username = $jsonFile->username;
        $pass = $jsonFile->password;

        $dsn = 'mysql:host=' . $host . ';port=' . $port . ';dbname=' . $dbname . ';';
        $connection = new PDO($dsn, $username, $pass);
        return $connection;
    }
}

?>