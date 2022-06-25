<?php

require './vendor/autoload.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header("Access-Control-Allow-Methods: GET, POST, DELETE");

use Controllers\LoginController;
use Errors\ExistsException;
use Errors\NotFoundException;
use Slim\Factory\AppFactory;

$app = AppFactory::create();
$app->addRoutingMiddleware();
$errorMiddleware = $app->addErrorMiddleware(true, true, true);

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

$app->run();

?>