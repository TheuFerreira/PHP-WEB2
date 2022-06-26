<?php

namespace Controllers;

use Repositories\EventRepository;
use Repositories\EventUserRepository;

class UserController {
    private EventRepository $eventRepository;
    private EventUserRepository $eventUserRepository;

    function __construct()
    {
        $this->eventRepository = new EventRepository();
        $this->eventUserRepository = new EventUserRepository();
    }

    public function getAllEventsOfUser($idUser) {
        $result = $this->eventRepository->getAllByUser($idUser);

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

            array_push($rows, $obj);
        }

        $json = json_encode($rows);
        return $json;
    }

    public function getAllEnteredEvents($idUser) {
        $result = $this->eventRepository->getAllEnteredEvents($idUser);

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
}

?>