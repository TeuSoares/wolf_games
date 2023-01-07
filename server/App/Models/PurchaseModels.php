<?php
    namespace App\Models;

    use App\Helpers\Crud;
    use App\Helpers\Messages;

    $dotenv = \Dotenv\Dotenv::createImmutable(__DIR__ . "/../../");
    $dotenv->load();

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

        public function registerResquest($data, $id_cliente){
            $info = $data["info"];
            $products = $data["products"];

            $crud = $this->crud;

            $id_pedido = uniqid("WG_", true);

            $id_pedido = str_replace(".", "", $id_pedido);

            $info["id_pedido"] = $id_pedido;
            $info["fk_id_cliente"] = $id_cliente;
            $info["data_pedido"] = date('Y-m-d');

            $crud->insert("pedidos", $info);

            foreach($products as $values){
                $values["fk_id_pedido"] = $id_pedido;
                $values["fk_id_cliente"] = $id_cliente;

                $values["fk_id_produto"] = $values["idProduct"];
                $values["quantidade"] = $values["qtd"];

                unset($values["idProduct"]);
                unset($values["qtd"]);

                $crud->insert("produtos_pedidos", $values);
            }

            return [
                "id_pedido" => $id_pedido
            ];

        }

        public function deliveryAddress($data, $id_cliente, $id_pedido){
            $address = $data["address"];
            $frete = $data["frete"];

            $address["fk_id_pedido"] = $id_pedido;
            $address["fk_id_cliente"] = $id_cliente;

            $crud = $this->crud;

            $crud->insert("endereco_entrega", $address);

            $crud->update([
                "table" => "pedidos",
                "fields" => "servico = :servico, valor_frete = :valor_frete",
                "where" => "fk_id_cliente = :id_cliente and id_pedido = :id_pedido",
                "values" => [
                    [":servico", $frete["servico"]],
                    [":valor_frete", $frete["valor_frete"]],
                    [":id_cliente", $id_cliente],
                    [":id_pedido", $id_pedido]
                ]
            ]);

            return [
                "id_pedido" => $id_pedido
            ];

        }

        public function checkIfAddressItsFull($id_cliente, $id_pedido){
            $crud = $this->crud;

            $data = $crud->select([
                "table" => "endereco_entrega",
                "fields" => "*",
                "where" => "fk_id_cliente = :fk_id_cliente and fk_id_pedido = :fk_id_pedido",
                "values" => [
                    [":fk_id_cliente", $id_cliente],
                    [":fk_id_pedido", $id_pedido]
                ]
            ]);

            if($data){
                return Messages::setMessage("error", "Full", $id_pedido);
            }else{
                return [
                    "response" => false
                ];
            }

        }

        public function reviewRequest($id_cliente, $id_pedido){
            $crud = $this->crud;

            $infoRequest = $crud->select([
                "table" => "pedidos",
                "fields" => "valor_pedido, servico, valor_frete, nome, cpf, email, rua, numero, cidade, bairro, cep",
                "join" => "INNER JOIN clientes ON pedidos.fk_id_cliente = id_cliente INNER JOIN endereco_entrega ON endereco_entrega.fk_id_pedido = id_pedido",
                "where" => "pedidos.fk_id_cliente = :fk_id_cliente and id_pedido = :fk_id_pedido and status_pedido = 'aberto'",
                "values" => [
                    [":fk_id_cliente", $id_cliente],
                    [":fk_id_pedido", $id_pedido]
                ]
            ]);

            $productsRequest = $crud->select([
                "table" => "produtos_pedidos",
                "fields" => "quantidade, subtotal, imagem, nome, id_produto",
                "join" => "INNER JOIN produtos ON fk_id_produto = id_produto",
                "where" => "fk_id_cliente = :fk_id_cliente and fk_id_pedido = :fk_id_pedido",
                "values" => [
                    [":fk_id_cliente", $id_cliente],
                    [":fk_id_pedido", $id_pedido]
                ]
            ]);

            $data = [
                "info" => $infoRequest,
                "products" => $productsRequest
            ];

            if($data){
                return $data;
            }else{
                return Messages::setMessage("error", "Não existe pedidos em aberto!");
            }
        }

        public function deleteRequest($id_cliente, $id_pedido){
            $crud = $this->crud;

            $crud->delete([
                "table" => "pedidos",
                "where" => "fk_id_cliente = :fk_id_cliente and id_pedido = :id_pedido",
                "values" => [
                    [":fk_id_cliente", $id_cliente],
                    [":id_pedido", $id_pedido],
                ]
            ]);

            $crud->delete([
                "table" => "endereco_entrega",
                "where" => "fk_id_cliente = :fk_id_cliente and fk_id_pedido = :fk_id_pedido",
                "values" => [
                    [":fk_id_cliente", $id_cliente],
                    [":fk_id_pedido", $id_pedido],
                ]
            ]);

            $crud->delete([
                "table" => "produtos_pedidos",
                "where" => "fk_id_cliente = :fk_id_cliente and fk_id_pedido = :fk_id_pedido",
                "values" => [
                    [":fk_id_cliente", $id_cliente],
                    [":fk_id_pedido", $id_pedido],
                ]
            ]);

            return Messages::setMessage("success", "Pedido deletado com sucesso!");
        }

        public function checkout($amount, $id_cliente, $id_pedido){
            // This is your test secret API key.
            $secret_key = $_ENV["SECRET_KEY_STRIPE"];
            \Stripe\Stripe::setApiKey($secret_key);

            $amount = str_replace(".", "", $amount);

            try {
                // Create a PaymentIntent with amount and currency
                $paymentIntent = \Stripe\PaymentIntent::create([
                    'amount' => $amount,
                    'currency' => 'brl',
                    'automatic_payment_methods' => [
                        'enabled' => true,
                    ],
                    "metadata" => [
                        "order_id" => $id_pedido,
                        "user_id" => $id_cliente
                    ]
                ]);

                $output = [
                    'clientSecret' => $paymentIntent->client_secret,
                ];

                return $output;
            } catch (Error $e) {
                echo $e->getMessage();
                return Messages::setMessage("error", "Houve um problema no servidor!. Tente novamente mais tarde.");
            }
        }

        public function paymentSucceeded($id_cliente, $id_pedido){
            $crud = $this->crud;

            $crud->update([
                "table" => "pedidos",
                "fields" => "status_pedido = 'a caminho'",
                "where" => "fk_id_cliente = :id_cliente and id_pedido = :id_pedido",
                "values" => [
                    [":id_cliente", $id_cliente],
                    [":id_pedido", $id_pedido]
                ]
            ]);

            return [
                "response" => true
            ];
        }
    }
?>