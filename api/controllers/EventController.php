<?php

namespace Controllers;

use Repositories\EventRepository;

class EventController {

    private EventRepository $eventRepository;

    function __construct()
    {
        $this->eventRepository = new EventRepository();
    }

    public function getAll() {
        $result = $this->eventRepository->getAll();
        $json = json_encode($result);
        return $json;
    }

}

?>