<?php
    use App\Controllers\ProductControllers;

    $this->get("/{brand}", ProductControllers::class . ":getProductByBrandOrCategoryAndSerie");

    $this->get("/{brand}/{id}", ProductControllers::class . ":getProductById");
?>