<?php
    date_default_timezone_set ("America/Sao_Paulo");

    require_once __DIR__ . "/../vendor/autoload.php";

    $config["displayErrorDetails"] = true;

    $app = new \Slim\App(["settings" => $config]);

    require_once __DIR__ . "/../App/Middlewares/GlobalMiddlewares.php";

    require_once __DIR__ . "/../App/Routes/Routes.php";

    $app->run();
?>