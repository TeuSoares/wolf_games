<?php
    namespace App\Controllers;

    use \Psr\Http\Message\ResponseInterface as Response;
    use \Psr\Http\Message\ServerRequestInterface as Request;

    use App\Models\PurchaseModels;

    class PurchaseControllers {
        private $model;

        public function __construct() {
            $this->model = new PurchaseModels;
        }

        public function cart(Request $request, Response $response){
            $products = $request->getQueryParam('products');

            $model = $this->model;

            $return = $model->cart($products);

            if(isset($return["status"]) && $return["status"] === "error"){
                return $response->withJson($return, 404);
            }

            return $response->withJson($return);
        }

        public function registerResquest(Request $request, Response $response){
            $data = $request->getParsedBody();
            $token = $request->getAttribute("token");

            $id_cliente = $token["id"];

            $model = $this->model;

            $return = $model->registerResquest($data, $id_cliente);

            return $response->withJson($return, 201);
        }

        public function deliveryAddress(Request $request, Response $response){
            $data = $request->getParsedBody();
            $token = $request->getAttribute("token");
            $id_pedido = $request->getAttribute("id_pedido");

            $id_cliente = $token["id"];

            $model = $this->model;

            $return = $model->deliveryAddress($data, $id_cliente, $id_pedido);

            return $response->withJson($return, 201);
        }

        public function checkIfAddressItsFull(Request $request, Response $response){
            $token = $request->getAttribute("token");
            $id_pedido = $request->getAttribute("id_pedido");

            $id_cliente = $token["id"];

            $model = $this->model;

            $return = $model->checkIfAddressItsFull($id_cliente, $id_pedido);

            if(isset($return["status"]) && $return["status"] === "error"){
                return $response->withJson($return, 422);
            }

            return $response->withJson($return);
        }

        public function reviewRequest(Request $request, Response $response){
            $token = $request->getAttribute("token");
            $id_pedido = $request->getAttribute("id_pedido");

            $id_cliente = $token["id"];

            $model = $this->model;

            $return = $model->reviewRequest($id_cliente, $id_pedido);

            if(isset($return["status"]) && $return["status"] === "error"){
                return $response->withJson($return, 404);
            }

            return $response->withJson($return);
        }

        public function deleteRequest(Request $request, Response $response){
            $token = $request->getAttribute("token");
            $id_pedido = $request->getAttribute("id_pedido");

            $id_cliente = $token["id"];

            $model = $this->model;

            $return = $model->deleteRequest($id_cliente, $id_pedido);

            return $response->withJson($return);
        }

        public function checkout(Request $request, Response $response){
            $data = $request->getParsedBody();
            $token = $request->getAttribute("token");

            $amount = $data['amount'];
            $id_pedido = $data['id_pedido'];

            $id_cliente = $token["id"];

            $model = $this->model;

            $return = $model->checkout($amount, $id_cliente, $id_pedido);

            if(isset($return["status"]) && $return["status"] === "error"){
                return $response->withJson($return, 500);
            }

            return $response->withJson($return);
        }
    }
?>