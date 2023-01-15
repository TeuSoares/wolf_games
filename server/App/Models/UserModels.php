<?php
    namespace App\Models;

    $dotenv = \Dotenv\Dotenv::createImmutable(__DIR__ . "/../../");
    $dotenv->load();

    use Firebase\JWT\JWT;
    use Firebase\JWT\Key;

    use App\Helpers\Crud;
    use App\Helpers\Email;
    use App\Helpers\Messages;

    class UserModels {
        private $crud;

        public function __construct(){
            $this->crud = new Crud;
        }

        public function register($data){
            $data['senha'] = password_hash($data['senha'], PASSWORD_DEFAULT);

            $crud = $this->crud;

            $response = $crud->insert("clientes", $data);

            $emailUser = $crud->select([
                "table" => "clientes",
                "fields" => "email, id_cliente",
                "where" => "email = :email",
                "values" => [
                    [":email", $data["email"]],
                ]
            ]);

            $codeVerification = rand(100000, 999999);

            $crud->insert("codigo_verificacao", [
                "fk_id_cliente" => $emailUser[0]["id_cliente"],
                "code_email" => $codeVerification
            ]);

            $mail = new Email($emailUser[0]["email"], "Confirmação de E-mail", "Código de verificação: $codeVerification");
            $mail->send();

            return $response;
        }

        public function verificationOfEmail($data){
            $codeInput = $data["codeInput"];
            $fk_id_cliente = $data["fk_id_cliente"];

            $crud = $this->crud;

            $codeVerification = $crud->select([
                "table" => "codigo_verificacao",
                "fields" => "code_email",
                "where" => "fk_id_cliente = :fk_id_cliente",
                "values" => [
                    [":fk_id_cliente", $fk_id_cliente],
                ]
            ]);

            if(isset($codeVerification[0]["code_email"])){
                $code = $codeVerification[0]["code_email"];
            }else{
                $code = 000000;
            }

            if($code == $codeInput){
                $crud->delete([
                    "table" => "codigo_verificacao",
                    "where" => "fk_id_cliente = :fk_id_cliente",
                    "values" => [
                        [":fk_id_cliente", $fk_id_cliente],
                    ]
                ]);

                return Messages::setMessage("success", "E-mail verificado com sucesso!");
            }else{
                return Messages::setMessage("error", "Código de verificação incorreto!");
            }
        }

        public function login($id){
            $payload = [
                "exp" => time() + (1 * 24 * 60 * 60),
                "id" => $id,
                "iat" => time()
            ];

            $key = $_ENV['SECRET_KEY'];

            $jwt = JWT::encode($payload, $key, 'HS256');

            return [
                "autenticação" => true,
                "token" => $jwt
            ];
        }

        public function profile($token){
            $crud = $this->crud;

            $response = $crud->select([
                "table" => "clientes",
                "fields" => "nome, email, cpf, data_nascimento, celular",
                "where" => "id_cliente = :id_cliente",
                "values" => [
                    [":id_cliente", $token["id"]],
                ]
            ]);

            return $response;
        }

        public function profileUpdate(array $data){
            $values = $data[0];
            $token = $data[1];

            if(isset($values["senha"])){
                $values['senha'] = password_hash($values['senha'], PASSWORD_DEFAULT);
            }

            $crud = $this->crud;

            $response = $crud->update([
                "table" => "clientes",
                "fields" => $values,
                "where" => "id_cliente = :id_cliente",
                "values" => [
                    [":id_cliente", $token["id"]],
                ]
            ]);

            return $response;
        }

        public function getRequests($id_cliente){
            $crud = $this->crud;

            $data = $crud->select([
                "table" => "pedidos",
                "fields" => "id_pedido, DATE_FORMAT(STR_TO_DATE(data_pedido, '%Y-%m-%d'), '%d/%m/%Y') as data, quantidade, valor_pedido, status_pedido",
                "where" => "fk_id_cliente = :fk_id_cliente",
                "values" => [
                    [":fk_id_cliente", $id_cliente],
                ]
            ]);

            if($data){
                return $data;
            }else{
                return Messages::setMessage("error", "Você ainda não realizou nenhum pedido!");
            }
        }

        public function getRequestsById($id_cliente, $id_pedido){
            $crud = $this->crud;

            $infoRequest = $crud->select([
                "table" => "pedidos",
                "fields" => "id_pedido, valor_pedido, DATE_FORMAT(STR_TO_DATE(data_pedido, '%Y-%m-%d'), '%d/%m/%Y') as data, servico, valor_frete, status_pedido, nome, cpf, email, rua, numero, cidade, bairro, cep",
                "join" => "INNER JOIN clientes ON pedidos.fk_id_cliente = id_cliente INNER JOIN endereco_entrega ON endereco_entrega.fk_id_pedido = id_pedido",
                "where" => "pedidos.fk_id_cliente = :fk_id_cliente and id_pedido = :fk_id_pedido",
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

            return $data;
        }
    }
?>