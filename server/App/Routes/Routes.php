<?php
    $app->group('/api', function () {
        
        $this->group('/users', function () {
            require_once __DIR__ . "/UserRoutes.php";
        });

        $this->group('/product', function () {
            require_once __DIR__ . "/ProductRoutes.php";
        });

        $this->group('/purchase', function () {
            require_once __DIR__ . "/PurchaseRoutes.php";
        });

        $this->group('/admin', function () {
            require_once __DIR__ . "/AdminRoutes.php";
        });

    });
?>