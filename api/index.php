<?php

require './vendor/autoload.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header("Access-Control-Allow-Methods: GET, POST, DELETE");

use Controllers\EventController;
use Controllers\LoginController;
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
$app->get('/web2/api/event/all', function ($request, $response, $args) {
    try {
        $controller = new EventController();
        $result = $controller->getAll();

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

$app->get('/web2/api/event/{id}', function ($request, $response, $args) {
    try {
        $idEvent = $args['id'];
        
        $controller = new EventController();
        $result = $controller->getById($idEvent);

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

$app->run();

?>