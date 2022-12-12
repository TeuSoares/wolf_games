<?php
    use App\Controllers\UserControllers;
    use App\Middlewares\UserMiddlewares;

    $this->post("/register", UserControllers::class . ":register")
    ->add(UserMiddlewares::class . ":verifyEmailOrCpfExists")
    ->add(UserMiddlewares::class . ":registerUserValidation");

    $this->post("/verificationEmail/{id}", UserControllers::class . ":verificationOfEmail")
    ->add(UserMiddlewares::class . ":verificationOfEmail");

    $this->post("/login", UserControllers::class . ":login")
    ->add(UserMiddlewares::class . ":checkIfUsersIsValid")
    ->add(UserMiddlewares::class . ":validationFieldsLogin");

    $this->get("/profile", UserControllers::class . ":profile");

    $this->put("/profile/update", UserControllers::class . ":profileUpdate")
    ->add(UserMiddlewares::class . ":validationFieldsProfileUpdate");
?>