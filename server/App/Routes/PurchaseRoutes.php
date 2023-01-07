<?php
    use App\Controllers\PurchaseControllers;
    use App\Middlewares\PurchaseMiddlewares;

    $this->get("/cart", PurchaseControllers::class . ":cart");

    $this->post("/registerResquest", PurchaseControllers::class . ":registerResquest");

    $this->get("/deliveryAddress/verifyExists/{id_pedido}", PurchaseControllers::class . ":checkIfAddressItsFull");

    $this->post("/deliveryAddress/{id_pedido}", PurchaseControllers::class . ":deliveryAddress")
    ->add(PurchaseMiddlewares::class . ":validationFieldsAddress");

    $this->get("/review/{id_pedido}", PurchaseControllers::class . ":reviewRequest");

    $this->delete("/delete/{id_pedido}", PurchaseControllers::class . ":deleteRequest");

    $this->post("/checkout", PurchaseControllers::class . ":checkout");

    $this->patch("/paymentSucceeded/{id_pedido}", PurchaseControllers::class . ":paymentSucceeded");
?>