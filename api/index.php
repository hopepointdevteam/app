<?php
require './vendor/autoload.php';

/*
	Comment out error reporting when in production
*/
error_reporting(E_ALL);

set_error_handler('Core\Error::errorHandler');
set_exception_handler('Core\Error::exceptionHandler');
// Begin the session when the user lands on the index page
session_start();

// Start new router
$router = new Core\Router();

// Routes
$router->add('{controller}/{action}');
$router->add('{controller}/{id:\d+}/{action}');

$router->dispatch($_SERVER['QUERY_STRING']);
