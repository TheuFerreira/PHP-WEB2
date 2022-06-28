<?php

require './vendor/autoload.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header("Access-Control-Allow-Methods: GET, POST, DELETE");

use Controllers\EventController;
use Controllers\LoginController;
use Controllers\PlaceController;
use Controllers\UserController;
use Errors\ExistsException;
use Errors\NotFoundException;
use Slim\Factory\AppFactory;

$app = AppFactory::create();
$app->addRoutingMiddleware();
$errorMiddleware = $app->addErrorMiddleware(true, true, true);

// Login Route
$app->get('/web2/api/login/signin/{email}/{password}', function($request, $response, $args) {
    try {
        $email = $args['email'];
        $password = $args['password'];
        
        $controller = new LoginController();
        $result = $controller->signIn($email, $password);
    
        $response->getBody()->write($result);
        return $response;
    } catch (NotFoundException) {
        $newResponse = $response->withStatus(204);
        return $newResponse;
    } catch (Exception) {
        $newResponse = $response->withStatus(500);
        return $newResponse;
    }
});

$app->post('/web2/api/login/register', function ($request, $response, $args) {
    try {
        $body = $request->getBody();
        $json = json_decode($body);
    
        $fullname = $json->fullname;
        $email = $json->email;
        $password = $json->password;
    
        $controller = new LoginController();
        $result = $controller->register($fullname, $email, $password);
    
        $response->getBody()->write($result);
        return $response;
    } catch (ExistsException) {
        $newResponse = $response->withStatus(400);
        return $newResponse;
    } catch (Exception) {
        $newResponse = $response->withStatus(500);
        return $newResponse;
    }
});

// Event
$app->get('/web2/api/event/all/{id_user}', function ($request, $response, $args) {
    try {
        $idUser = $args['id_user'];

        $controller = new EventController();
        $result = $controller->getAll($idUser);

        $response->getBody()->write($result);
        return $response;
    } catch (Exception) {
        $newResponse = $response->withStatus(500);
        return $newResponse;
    }
});

$app->post('/web2/api/event/enter', function ($request, $response, $args) {
    try {
        $body = $request->getBody();
        $json = json_decode($body);
    
        $idEvent = $json->id_event;
        $idUser = $json->id_user;
    
        $controller = new EventController();
        $result = $controller->enter($idEvent, $idUser);
    
        $response->getBody()->write($result);
        return $response;
    } catch (Exception) {
        $newResponse = $response->withStatus(500);
        return $newResponse;
    }
});

$app->get('/web2/api/event/{id_user}/{id_event}', function ($request, $response, $args) {
    try {
        $idUser = $args['id_user'];
        $idEvent = $args['id_event'];
        
        $controller = new EventController();
        $result = $controller->getById($idEvent, $idUser);

        $response->getBody()->write($result);
        return $response;
    } catch (NotFoundException) {
        $newResponse = $response->withStatus(204);
        return $newResponse;
    } catch (Exception) {
        $newResponse = $response->withStatus(500);
        return $newResponse;
    }
});

$app->post('/web2/api/event', function ($request, $response, $args) {
    try {
        $body = $request->getBody();
        $json = json_decode($body);

        $idUser = $json->id_user;
        $title = $json->title;
        $description = $json->description;
        $idPlace = $json->id_place;
        $date = $json->date;

        $controller = new EventController();
        $result = $controller->create($idUser, $title, $description, $idPlace, $date);

        $response->getBody()->write($result);
        return $response;
    } catch (Exception) {
        $newResponse = $response->withStatus(500);
        return $newResponse;
    }
});

// User
$app->get('/web2/api/user/AllEvents/{id_user}', function($request, $response, $args) {
    try {
        $idUser = $args['id_user'];

        $controller = new UserController();
        $result = $controller->getAllEventsOfUser($idUser);

        $response->getBody()->write($result);
        return $response;
    } catch (Exception) {
        $newResponse = $response->withStatus(500);
        return $newResponse;
    }
});

$app->get('/web2/api/user/EnteredEvents/{id_user}', function($request, $response, $args) {
    try {
        $idUser = $args['id_user'];

        $controller = new UserController();
        $result = $controller->getAllEnteredEvents($idUser);

        $response->getBody()->write($result);
        return $response;
    } catch (Exception) {
        $newResponse = $response->getBody()->withStatus(500);
        return $newResponse;
    }
});

// Place
$app->post('/web2/api/place', function($request, $response, $args) {
    try {
        $body = $request->getBody();
        $json = json_decode($body);

        $description = $json->description;
        $controller = new PlaceController();
        $result = $controller->create($description);

        $response->getBody()->write($result);
        return $response;
    } catch (Exception) {
        $newResponse = $response->withStatus(500);
        return $newResponse;
    }
});

$app->get('/web2/api/place/all', function($request, $response, $args) {
    //try {
        $controller = new PlaceController();
        $result = $controller->getAll();

        $response->getBody()->write($result);
        return $response;
    /*} catch (Exception) {
        $newResponse = $response->withStatus(500);
        return $newResponse;
    }*/
});

$app->run();

?>