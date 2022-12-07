<?php
    namespace App\Controllers;

    use \Psr\Http\Message\ResponseInterface as Response;
    use \Psr\Http\Message\ServerRequestInterface as Request;

    use App\Models\UserModels;

    class UserControllers {
        private $model;

        public function __construct() {
            $this->model = new UserModels;
        }

        public function register(Request $request, Response $response){
            $data = $request->getParsedBody();

            $model = $this->model;

            $return = $model->register($data);

            return $response->withJson($return, 201);
        }

        public function verificationOfEmail(Request $request, Response $response){
            $data = $request->getParsedBody();

            $model = $this->model;

            $return = $model->verificationOfEmail($data);

            return $response->withJson($return);
        }

        public function login(Request $request, Response $response){
            $data = $request->getParsedBody();

            $model = $this->model;

            $return = $model->login($data);

            return $response->withJson($return);
        }
    }
?>