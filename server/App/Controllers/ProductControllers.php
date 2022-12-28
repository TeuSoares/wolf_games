<?php
    namespace App\Controllers;

    use \Psr\Http\Message\ResponseInterface as Response;
    use \Psr\Http\Message\ServerRequestInterface as Request;

    use App\Models\ProductModels;

    class ProductControllers {
        private $model;

        public function __construct() {
            $this->model = new ProductModels;
        }

        public function home(Request $request, Response $response){
            $model = $this->model;

            $return = $model->home();

            return $response->withJson($return);
        }

        public function search(Request $request, Response $response){
            $query = $request->getQueryParam('query');

            $model = $this->model;

            $return = $model->search($query);

            if(isset($return["status"]) && $return["status"] == "error"){
                return $response->withJson($return, 404);
            }

            return $response->withJson($return);
        }

        public function getProductByBrandOrCategoryAndSerie(Request $request, Response $response){
            $brand = $request->getAttribute("brand");

            $serie = $request->getQueryParam('serie');
            $category = $request->getQueryParam('category');

            $model = $this->model;

            $return = $model->getProductByBrandOrCategoryAndSerie($brand, $serie, $category);

            if(isset($return["status"]) && $return["status"] == "error"){
                return $response->withJson($return, 404);
            }

            return $response->withJson($return);
        }

        public function getProductById(Request $request, Response $response){
            $id = $request->getAttribute("id");
            $brand = $request->getAttribute("brand");

            $model = $this->model;

            $return = $model->getProductById($id, $brand);

            if(isset($return["status"]) && $return["status"] == "error"){
                return $response->withJson($return, 404);
            }

            return $response->withJson($return);
        }

        public function calculateFrete(Request $request, Response $response){
            $data = $request->getParsedBody();

            $model = $this->model;

            $return = $model->calculateFrete($data);

            if(isset($return["status"]) && $return["status"] == "error"){
                return $response->withJson($return, 422);
            }

            return $response->withJson($return);
        }
    }
?>