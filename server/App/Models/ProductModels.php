<?php
    namespace App\Models;

    use App\Helpers\Crud;
    use App\Helpers\Messages;
    use App\Helpers\Correios;

    class ProductModels {
        private $crud;

        public function __construct(){
            $this->crud = new Crud;
        }

        public function home(){
            $crud = $this->crud;

            $products = $crud->select([
                "table" => "produtos",
                "fields" => "id_produto, marca, categoria, imagem, nome, preco_unitario",
            ]);

            $productsFeatured = $crud->select([
                "table" => "produtos",
                "fields" => "id_produto, marca, categoria, imagem, nome, preco_unitario",
                "others" => "ORDER BY RAND() LIMIT 3"
            ]);

            return [
                "products" => $products,
                "productsFeatured" => $productsFeatured
            ];
        }

        public function search($query){
            $crud = $this->crud;

            $products = $crud->select([
                "table" => "produtos",
                "fields" => "*",
                "where" => "nome LIKE '%$query%' OR serie LIKE '%$query%'",
                "others" => "LIMIT 10"
            ]);

            if($products){
                return $products;
            }else{
                return Messages::setMessage("error", "Não foram encontrados produtos, para essa pesquisa!");
            }

        }

        public function getProductByBrandOrCategoryAndSerie($brand, $serie, $category){
            $crud = $this->crud;

            $where = "marca = :marca and quantidade_estoque > 0";

            $values = [[":marca", $brand]];

            if(isset($serie) && empty($category)){
                $where = "marca = :marca AND serie = :serie AND quantidade_estoque > 0";

                array_push($values, [":serie", $serie]);
            }else if(isset($category) && empty($serie)){
                $where = "marca = :marca AND categoria = :categoria AND quantidade_estoque > 0";

                array_push($values, [":categoria", $category]);
            }else if(isset($category) && isset($serie)){
                $where = "marca = :marca AND serie = :serie AND categoria = :categoria AND quantidade_estoque > 0";

                array_push($values, [":serie", $serie], [":categoria", $category]);
            }

            $data = $crud->select([
                "table" => "produtos",
                "fields" => "id_produto, marca, categoria, imagem, nome, preco_unitario",
                "where" => $where,
                "values" => $values
            ]);

            $series = $crud->select([
                "table" => "produtos",
                "fields" => "serie",
                "where" => "marca = :marca and quantidade_estoque > 0",
                "others" => "GROUP BY serie",
                "values" => [
                    [":marca", $brand]
                ]
            ]);

            if($data){
                return [
                    "products" => $data,
                    "series" => $series
                ];
            }else{
                return Messages::setMessage("error", "Produtos não encontrados!");
            }
        }

        public function getProductById($id, $brand){
            $crud = $this->crud;

            $data = $crud->select([
                "table" => "produtos",
                "fields" => "*",
                "where" => "marca = :marca and id_produto = :id_produto",
                "values" => [
                    [":id_produto", $id],
                    [":marca", $brand],
                ]
            ]);

            if($data){
                return $data;
            }else{
                return Messages::setMessage("error", "Produto não encontrado!");
            }
        }

        public function calculateFrete($data, $category){
            $service = $data["service"];
            $destinationCEP = $data["destinationCEP"];

            if($service == "sedex"){
                $service = "40010";
            }else if($service == "pac"){
                $service = "41106";
            }

            if($category == "console"){
                $weight = 4.5;
                $length = 26;
                $height = 10.4;
                $width = 39;
            }else if($category == "game"){
                $weight = 3.5;
                $length = 7.9;
                $height = 27.5;
                $width = 33.3;
            }else{
                $weight = 0;
                $length = 0;
                $height = 0;
                $width = 0;
            }

           $correios = new Correios($service, "13330670", $destinationCEP, $weight, $length, $height, $width);
           $response = $correios->calculateFrete();

           return $response;
        }
    }
?>