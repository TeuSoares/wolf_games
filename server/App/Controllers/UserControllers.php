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
            $fk_id_cliente = $request->getAttribute('id');

            $arrayData = [
                "codeInput" => $data["codeInput"],
                "fk_id_cliente" => $fk_id_cliente
            ];

            $model = $this->model;

            $return = $model->verificationOfEmail($arrayData);

            if($return["status"] == "error"){
                return $response->withJson($return, 422);
            }

            return $response->withJson($return);
        }

        public function login(Request $request, Response $response){
            $id_cliente = $request->getAttribute('id');

            $model = $this->model;

            $return = $model->login($id_cliente);

            return $response->withJson($return);
        }

        public function profile(Request $request, Response $response){
            $token = $request->getAttribute("token");

            $model = $this->model;

            $return = $model->profile($token);

            return $response->withJson($return);
        }

        public function profileUpdate(Request $request, Response $response){
            $data = $request->getParsedBody();
            $token = $request->getAttribute("token");

            $model = $this->model;

            $return = $model->profileUpdate([$data, $token]);

            return $response->withJson($return);
        }

        public function getRequests(Request $request, Response $response){
            $token = $request->getAttribute("token");

            $id_cliente = $token["id"];

            $model = $this->model;

            $return = $model->getRequests($id_cliente);

            if(isset($return["status"]) && $return["status"] === "error"){
                return $response->withJson($return, 404);
            }

            return $response->withJson($return);
        }

        public function getRequestsById(Request $request, Response $response){
            $token = $request->getAttribute("token");
            $id_pedido = $request->getAttribute("id_pedido");

            $id_cliente = $token["id"];

            $model = $this->model;

            $return = $model->getRequestsById($id_cliente, $id_pedido);

            return $response->withJson($return);
        }
    }
?>