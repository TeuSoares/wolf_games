<?php
    namespace App\Models;

    $dotenv = \Dotenv\Dotenv::createImmutable("F:\Programação\Desenvolvimento\projetos\wolfGames\cliente\server");
    $dotenv->load();

    use Firebase\JWT\JWT;
    use Firebase\JWT\Key;

    use App\Helpers\Crud;
    use App\Helpers\Email;
    use App\Helpers\Messages;
    use App\Helpers\tokenJWT;

    class UserModels {
        private $crud;

        public function __construct(){
            $this->crud = new Crud;
        }

        public function register($data){
            $data['senha'] = password_hash($data['senha'], PASSWORD_DEFAULT);

            $crud = $this->crud;

            $crud->insert("clientes", $data);

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

            return $emailUser;
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

            $code = $codeVerification[0]["code_email"];

            if(isset($code) == $codeInput){
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

        public function login($data){
            $payload = [
                "exp" => time() + (1 * 24 * 60 * 60),
                "email" => $data["email"],
                "iat" => time()
            ];

            $key = $_ENV['SECRET_KEY'];

            $jwt = JWT::encode($payload, $key, 'HS256');

            setcookie('token', $jwt, time() + (1 * 24 * 60 * 60));

            return [
                "autenticação" => true,
                "token" => $jwt
            ];
        }
    }
?>