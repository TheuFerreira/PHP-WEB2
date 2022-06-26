<?php

namespace Controllers;

use Repositories\EventRepository;

class UserController {
    private EventRepository $eventRepository;

    function __construct()
    {
        $this->eventRepository = new EventRepository();
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
}

?>