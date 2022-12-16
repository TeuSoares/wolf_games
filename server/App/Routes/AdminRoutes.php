<?php
    use App\Controllers\AdminControllers;
    use App\Middlewares\AdminMiddlewares;

    header("Access-Control-Allow-Origin:*");

    $dotenv = \Dotenv\Dotenv::createImmutable(__DIR__ . "/../../");
    $dotenv->load();

    $this->add(new Tuupola\Middleware\JwtAuthentication([
        "path" => ["/api/admin/insertProducts"],
        "secret" => $_ENV['SECRET_KEY_PANEL_ADMIN'],
        "error" => function ($response) {
            return $response->withJson([
                "authorization_admin" => false
            ]);
        }
    ]));

    $this->post("/insertProducts", AdminControllers::class . ":insertProducts");

    $this->post("/register", AdminControllers::class . ":register")
    ->add(AdminMiddlewares::class . ":verifyIfKeyIsValid")
    ->add(AdminMiddlewares::class . ":registerAdminValidation");

    $this->post("/login", AdminControllers::class . ":login")
    ->add(AdminMiddlewares::class . ":verifyIfKeyIsValid")
    ->add(AdminMiddlewares::class . ":validationFieldsLogin");
?>