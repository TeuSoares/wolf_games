<?php
    $dotenv = \Dotenv\Dotenv::createImmutable(__DIR__ . "/../../");
    $dotenv->load();

    $app->add(new Tuupola\Middleware\JwtAuthentication([
        "path" => ["/api/users/", "/api/purchase/"],
        "ignore" => ["/api/users/register", "/api/users/login", "/api/users/verificationEmail"],
        "secret" => $_ENV['SECRET_KEY'],
        "error" => function ($response) {
            return $response->withJson([
                "authorization" => false
            ]);
        }
    ]));

    $app->add(function ($req, $res, $next) {
        $response = $next($req, $res);
        return $response
        ->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Credentials', 'true')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    });
?>