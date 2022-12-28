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
    }
?>