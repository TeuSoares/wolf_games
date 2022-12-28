<?php
    namespace App\Models;

    use App\Helpers\Crud;
    use App\Helpers\Messages;

    class PurchaseModels {
        private $crud;

        public function __construct(){
            $this->crud = new Crud;
        }

        public function cart($products){
            $crud = $this->crud;

            $data = $crud->select([
                "table" => "produtos",
                "fields" => "id_produto, serie, marca, categoria, imagem, nome, preco_unitario, quantidade_estoque",
                "where" => "id_produto IN($products)"
            ]);

            if($data){
                return $data;
            }else{
                return Messages::setMessage("error", "Não foram encontrados produtos adicionados no carrinho!");
            }

        }
    }
?>