<?php
    namespace App\Models;

    $dotenv = \Dotenv\Dotenv::createImmutable(__DIR__ . "/../../");
    $dotenv->load();

    use Firebase\JWT\JWT;
    use Firebase\JWT\Key;

    use App\Helpers\Crud;
    use App\Helpers\Messages;

    class AdminModels {
        private $crud;

        public function __construct(){
            $this->crud = new Crud;
        }

        public function register($body){
            $crud = $this->crud;

            $crud->select([
                "table" => "admin",
                "fields" => "email, cpf",
                "where" => "email = :email or cpf = :cpf",
                "values" => [
                    [":email", $body["email"]],
                    [":cpf", $body["cpf"]],
                ]
            ]);

            $statement = $crud->statement;
            $row = $statement->rowCount();

            if($row > 0){
                return Messages::setMessage("error", "Esse admin já existe!");
            }

            $body['senha'] = password_hash($body['senha'], PASSWORD_DEFAULT);

            $response = $crud->insert("admin", $body);

            return $response;
        }

        public function login($body){
            $crud = $this->crud;

            $email = $body['email'];
            $senha = $body['senha'];

            $data = $crud->select([
                "table" => "admin",
                "fields" => "id_admin, email, senha",
                "where" => "email = :email",
                "values" => [
                    [":email", $email],
                ]
            ]);

            $statement = $crud->statement;
            $row = $statement->rowCount();

            if($row == 0){
                return Messages::setMessage("error", "Essa e-mail não existe!");
            }

            if($row > 0){
                if(!password_verify($senha, $data[0]["senha"])){
                    return Messages::setMessage("error", "Senha incorreta!");
                }
            }

            $payload = [
                "exp" => time() + (14 * 24 * 60 * 60),
                "status" => "admin",
                "access" => "total",
                "id_admin" => $data[0]["id_admin"],
                "iat" => time()
            ];

            $key = $_ENV['SECRET_KEY_PANEL_ADMIN'];

            $jwt = JWT::encode($payload, $key, 'HS256');

            return [
                "status" => "success",
                "token_admin" => $jwt
            ];
        }

        public function insertProducts($data, $token){
            if($token["access"] == "total"){
                $crud = $this->crud;

                $crud->select([
                    "table" => "produtos",
                    "fields" => "nome, marca, serie",
                    "where" => "nome = :nome and marca = :marca and serie = :serie",
                    "values" => [
                        [":nome", $data["nome"]],
                        [":marca", $data["marca"]],
                        [":serie", $data["serie"]],
                    ]
                ]);

                $statement = $crud->statement;
                $row = $statement->rowCount();

                if($row > 0){
                    return Messages::setMessage("error", "Esse produto já existe!");
                }

                $data["marca"] = strtolower($data["marca"]);
                $data["serie"] = strtolower($data["serie"]);
                $data["categoria"] = strtolower($data["categoria"]);

                $image = $_FILES["imagem"]["name"];
                $extensao = strtolower(pathinfo($image, PATHINFO_EXTENSION));

                $random = rand(1000, 9999);

                $newNameImage = "IMG-" . md5($image) . $random . "." . $extensao;
                $diretorio = __DIR__ . "/../../../public/server/uploads/";
    
                $data["imagem"] = $newNameImage;
    
                $response = $crud->insert("produtos", $data, "Produto cadastrado com sucesso!");

                move_uploaded_file($_FILES["imagem"]["tmp_name"], $diretorio . $newNameImage);
    
                return $response;
            }else{
                return Messages::setMessage("error", "Você não tem permissão para isso!");
            }
        }
    }
?>