<?php
    namespace App\Controllers;

    use \Psr\Http\Message\ResponseInterface as Response;
    use \Psr\Http\Message\ServerRequestInterface as Request;

    use App\Models\AdminModels;

    class AdminControllers {
        private $model;

        public function __construct() {
            $this->model = new AdminModels;
        }

        public function register(Request $request, Response $response){
            $data = $request->getParsedBody();

            unset($data["key_admin"]);

            $model = $this->model;

            $return = $model->register($data);

            if($return["status"] == "error"){
                return $response->withJson($return, 422);
            }

            return $response->withJson($return, 201);
        }

        public function login(Request $request, Response $response){
            $data = $request->getParsedBody();

            $model = $this->model;

            $return = $model->login($data);

            if($return["status"] == "error"){
                return $response->withJson($return, 422);
            }

            return $response->withJson($return);
        }

        public function insertProducts(Request $request, Response $response){
            $data = $request->getParsedBody();
            $token = $request->getAttribute("token");

            $model = $this->model;

            $return = $model->insertProducts($data, $token);

            if($return["status"] == "error"){
                return $response->withJson($return, 422);
            }

            return $response->withJson($return, 201);
        }
    }
?>