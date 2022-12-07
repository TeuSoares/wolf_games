<?php
    namespace App\Middlewares;

    use \Psr\Http\Message\ResponseInterface as Response;
    use \Psr\Http\Message\ServerRequestInterface as Request;

    use App\Helpers\Crud;
    use App\Helpers\Validation;
    use App\Helpers\tokenJWT;

    class UserMiddlewares {
        private $crud;

        public function __construct(){
            $this->crud = new Crud;
        }

        public function registerUserValidation(Request $request, Response $response, $next){
            $data = $request->getParsedBody();
            
            $nome = $data["nome"];
            $cpf = $data["cpf"];
            $email = $data["email"];
            $senha = $data["senha"];
            $celular = $data["celular"];
            $nascimento = $data["data_nascimento"];

            Validation::checkEmptyFields($data);

            Validation::verifyFieldLength([
                ["$nome < 4", "O nome não pode conter menos de 4 caracteres!"],
                ["$cpf != 11", "Formato de cpf inválido!"],
                ["$senha < 6", "A senha não pode conter menos de 6 caracteres!"],
                ["$senha > 12", "A senha não pode conter mais de 12 caracteres!"],
                ["$celular != 11", "Formato de celular inválido!"]
            ]);

            Validation::onlyLetters(["nome" => $nome,]);

            Validation::onlyLettersAndNumbers(["senha" => $senha]);

            Validation::verifyFieldIsNumeric(["cpf" => $cpf, "celular" => $celular]);

            Validation::checkDateValid($nascimento, "Essa data não é válida!");

            if(!filter_var($email, FILTER_VALIDATE_EMAIL)){
                Validation::setErrors("Esse e-mail é inválido!");
            }

            $errors = Validation::getErrors();

            return Validation::send($errors, $request, $response, $next);
        }

        public function verifyEmailOrCpfExists(Request $request, Response $response, $next){
            $data = $request->getParsedBody();

            $crud = $this->crud;

            $email = $data['email'];
            $cpf = $data['cpf'];

            $crud->select([
                "table" => "clientes",
                "fields" => "email, cpf",
                "where" => "email = :email OR cpf = :cpf",
                "values" => [
                    [":email", $email],
                    [":cpf", $cpf]
                ]
            ]);

            $statement = $crud->statement;

            $row = $statement->rowCount();

            if($row > 0){
                Validation::setErrors("Este email ou cpf já estão sendo utilizados!");
            }

            $errors = Validation::getErrors();

            return Validation::send($errors, $request, $response, $next);
        }

        public function verificationOfEmail(Request $request, Response $response, $next){
            $data = $request->getParsedBody();

            Validation::checkEmptyFields($data);

            $codeInput = $data["codeInput"];

            Validation::verifyFieldIsNumeric(["código" => $codeInput]);

            Validation::verifyFieldLength([
                ["$codeInput != 6", "O campo só pode conter até 6 números!"],
            ]);

            $errors = Validation::getErrors();

            return Validation::send($errors, $request, $response, $next);
        }

        public function validationFieldsLogin(Request $request, Response $response, $next){
            $data = $request->getParsedBody();

            $email = $data["email"];
            $senha = $data["senha"];

            Validation::checkEmptyFields($data);

            if(!filter_var($email, FILTER_VALIDATE_EMAIL)){
                Validation::setErrors("Esse e-mail é inválido!");
            }

            Validation::onlyLettersAndNumbers(["senha" => $senha]);

            Validation::verifyFieldLength([
                ["$senha < 6", "A senha não pode conter menos de 6 caracteres!"],
                ["$senha > 12", "A senha não pode conter mais de 12 caracteres!"]
            ]);

            $errors = Validation::getErrors();

            return Validation::send($errors, $request, $response, $next);
        }

        public function checkIfUsersIsValid(Request $request, Response $response, $next){
            $body = $request->getParsedBody();

            $crud = $this->crud;

            $data = $crud->select([
                "table" => "clientes",
                "fields" => "email, senha, status_conta, code_email",
                "join" => "LEFT JOIN codigo_verificacao ON codigo_verificacao.fk_id_cliente = id_cliente",
                "where" => "email = :email",
                "values" => [
                    [":email", $body['email']],
                ]
            ]);

            $statement = $crud->statement;
            $row = $statement->rowCount();

            if($row == 0){
                Validation::setErrors("Esse e-mail não existe!");
            }

            if($row > 0){
                if(!password_verify($body['senha'], $data[0]["senha"])){
                    Validation::setErrors("Senha incorreta!");
                }

                if(!$data[0]["status_conta"]){ 
                    Validation::setErrors("Essa conta está inativa! Entre em contato com o suporte."); 
                }

                if($data[0]["code_email"] != ""){ 
                    Validation::setErrors("Validação"); 
                }
            }

            $errors = Validation::getErrors();

            return Validation::send($errors, $request, $response, $next);
        }
    }
?>