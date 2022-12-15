<?php
    namespace App\Middlewares;

    use \Psr\Http\Message\ResponseInterface as Response;
    use \Psr\Http\Message\ServerRequestInterface as Request;

    use App\Helpers\Validation;

    class AdminMiddlewares {
        public function verifyIfKeyIsValid(Request $request, Response $response, $next){
            $data = $request->getParsedBody();
            $key_admin = $_ENV["SECRET_KEY_PANEL_ADMIN"];
    
            if($data["key_admin"] != $key_admin){
                return $response->withJson([
                    "status" => "error",
                    "message" => "Chave inválida"
                ], 422);
            }
    
            return $response = $next($request, $response);
        }

        public function registerAdminValidation(Request $request, Response $response, $next){
            $data = $request->getParsedBody();
            
            $nome = $data["nome"];
            $cpf = $data["cpf"];
            $email = $data["email"];
            $senha = $data["senha"];
            $celular = $data["celular"];

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

            if(!filter_var($email, FILTER_VALIDATE_EMAIL)){
                Validation::setErrors("Esse e-mail é inválido!");
            }

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
    }
?>