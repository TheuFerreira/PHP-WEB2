<?php

namespace Controllers;

use Errors\NotFoundException;
use Repositories\EventRepository;
use Repositories\EventUserRepository;
use Repositories\PlaceRepository;

class EventController {

    private EventRepository $eventRepository;
    private EventUserRepository $eventUserRepository;
    private PlaceRepository $placeRepository;

    function __construct()
    {
        $this->eventRepository = new EventRepository();
        $this->eventUserRepository = new EventUserRepository();
        $this->placeRepository = new PlaceRepository();
    }

    public function getAll($idUser) {
        $result = $this->eventRepository->getAll();

        $rows = array();
        for ($i = 0; $i < count($result); $i++) {
            $row = $result[$i];
            $idEvent = intval($row['id_event']);
            $idPlace = intval($row['id_place']);

            $obj['id_event'] = $idEvent ;
            $obj['id_user'] = intval($row['id_user']);
            $obj['title'] = $row['title'];
            $obj['description'] = $row['description'];
            $obj['date'] = $row['date'];
            $obj['count_peoples'] = intval($row['count_peoples']);

            $userIsInEvent = $this->eventUserRepository->checkUserIsInEvent($idEvent , $idUser);
            $obj['is_in_event'] = $userIsInEvent;

            $placeDescription = $this->placeRepository->getDescriptionById($idPlace);
            $obj['place'] = $placeDescription;

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

    public function exit($idEvent, $idUser) {
        $result = $this->eventUserRepository->delete($idEvent, $idUser);
        $json = json_encode($result);
        return $json;
    }

    public function create($idUser, $title, $description, $idPlace, $date) {
        $createdAt = gmdate("Y-m-d\TH:i:s");

        $result = $this->eventRepository->insert($idUser, $title, $description, $idPlace, $date, $createdAt);
        $json = json_encode($result);
        return $json;
    }

}

?>