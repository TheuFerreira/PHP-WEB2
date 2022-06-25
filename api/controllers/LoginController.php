<?php

namespace Controllers;

use Errors\ExistsException;
use Errors\NotFoundException;
use Repositories\UsersRepository;

class LoginController {
    private UsersRepository $repository;

    function __construct() {
        $this->repository = new UsersRepository();
    }

    public function signIn($email, $password) {
        $result = $this->repository->getByEmailAndPassword($email, $password);
        if ($result == null) {
            throw new NotFoundException();
        }

        $json = json_encode($result);
        return $json;
    }

    public function register($fullname, $email, $password) {
        $exists = $this->repository->checkExists($email);
        if ($exists) {
            throw new ExistsException(); 
        }

        $result = $this->repository->insert($fullname, $email, $password);
        $json = json_encode($result);

        return $json;
    }

}

?>