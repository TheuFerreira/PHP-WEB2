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

    public function getAll() {
        $result = $this->eventRepository->getAll();
        $json = json_encode($result);
        return $json;
    }

    public function enter($idEvent, $idUser) {
        $registeredAt = gmdate("Y-m-d\TH:i:s");

        $result = $this->eventUserRepository->insert($idEvent, $idUser, $registeredAt);
        $json = json_encode($result);
        return $json;
    }

    public function getById($idEvent) {
        $event = $this->eventRepository->getById($idEvent);
        if ($event == null) {
            throw new NotFoundException();
        }
        
        $json = json_encode($event);
        return $json;
    }

}

?>