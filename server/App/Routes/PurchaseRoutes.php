<?php
    use App\Controllers\PurchaseControllers;

    $this->get("/cart", PurchaseControllers::class . ":cart");
?>