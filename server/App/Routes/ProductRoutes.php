<?php
    use App\Controllers\ProductControllers;
    use App\Middlewares\ProductsMiddlewares;

    $this->get("/{brand}", ProductControllers::class . ":getProductByBrandOrCategoryAndSerie");

    $this->get("/{brand}/{id}", ProductControllers::class . ":getProductById");

    $this->post("/frete/{category}", ProductControllers::class . ":calculateFrete")
    ->add(ProductsMiddlewares::class . ":validationFieldsFrete");
?>