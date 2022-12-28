<?php
    use App\Controllers\ProductControllers;
    use App\Middlewares\ProductsMiddlewares;

    $this->get("/", ProductControllers::class . ":home");

    $this->get("/search", ProductControllers::class . ":search")
    ->add(ProductsMiddlewares::class . ":validationFieldSearch");

    $this->get("/{brand}", ProductControllers::class . ":getProductByBrandOrCategoryAndSerie");

    $this->get("/{brand}/{id}", ProductControllers::class . ":getProductById");

    $this->post("/frete", ProductControllers::class . ":calculateFrete")
    ->add(ProductsMiddlewares::class . ":validationFieldsFrete");
?>