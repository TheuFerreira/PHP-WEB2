<?php

require './vendor/autoload.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header("Access-Control-Allow-Methods: GET, POST, DELETE");

use Controllers\LoginController;
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
    } catch (Exception){
        $newResponse = $response->withStatus(400);
        return $newResponse;
    }
});

$app->run();

?>