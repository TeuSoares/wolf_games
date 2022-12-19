<?php
    namespace App\Models;

    use App\Helpers\Crud;
    use App\Helpers\Messages;

    class ProductModels {
        private $crud;

        public function __construct(){
            $this->crud = new Crud;
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
                "fields" => "id_produto, marca, imagem, nome, preco_unitario",
                "where" => $where,
                "values" => $values
            ]);

            if($data){
                return $data;
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
    }
?>