<?php

namespace Controllers;

use Repositories\PlaceRepository;

class PlaceController {
    private PlaceRepository $placeRepository;

    function __construct()
    {
        $this->placeRepository = new PlaceRepository();
    }

    public function create($description) {
        $result = $this->placeRepository->insert($description);
        $json = json_encode($result);
        return $json;
    }
}

?>