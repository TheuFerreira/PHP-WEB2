<?php

namespace Controllers;

use Errors\NotFoundException;
use Repositories\EventRepository;
use Repositories\EventUserRepository;

class EventController {

    private EventRepository $eventRepository;
    private EventUserRepository $eventUserRepository;

    function __construct()
    {
        $this->eventRepository = new EventRepository();
        $this->eventUserRepository = new EventUserRepository();
    }

    public function getAll($idUser) {
        $result = $this->eventRepository->getAll();

        $rows = array();
        for ($i = 0; $i < count($result); $i++) {
            $row = $result[$i];
            $idEvent = intval($row['id_event']);

            $obj['id_event'] = $idEvent ;
            $obj['id_user'] = intval($row['id_user']);
            $obj['title'] = $row['title'];
            $obj['description'] = $row['description'];
            $obj['local'] = $row['local'];
            $obj['date'] = $row['date'];
            $obj['count_peoples'] = intval($row['count_peoples']);

            $userIsInEvent = $this->eventUserRepository->checkUserIsInEvent($idEvent , $idUser);
            $obj['is_in_event'] = $userIsInEvent;

            array_push($rows, $obj);
        }

        $json = json_encode($rows);
        return $json;
    }

    public function enter($idEvent, $idUser) {
        $registeredAt = gmdate("Y-m-d\TH:i:s");

        $result = $this->eventUserRepository->insert($idEvent, $idUser, $registeredAt);
        $json = json_encode($result);
        return $json;
    }

    public function getById($idEvent, $idUser) {
        $row = $this->eventRepository->getById($idEvent);
        if ($row == null) {
            throw new NotFoundException();
        }

        $idEvent = intval($row['id_event']);

        $obj['id_event'] = $idEvent ;
        $obj['id_user'] = intval($row['id_user']);
        $obj['title'] = $row['title'];
        $obj['description'] = $row['description'];
        $obj['local'] = $row['local'];
        $obj['date'] = $row['date'];
        $obj['count_peoples'] = intval($row['count_peoples']);

        $userIsInEvent = $this->eventUserRepository->checkUserIsInEvent($idEvent , $idUser);
        $obj['is_in_event'] = $userIsInEvent;
        
        $json = json_encode($obj);
        return $json;
    }

    public function create($idUser, $title, $description, $local, $date) {
        $createdAt = gmdate("Y-m-d\TH:i:s");

        $result = $this->eventRepository->insert($idUser, $title, $description, $local, $date, $createdAt);
        $json = json_encode($result);
        return $json;
    }

}

?>