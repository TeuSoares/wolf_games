<?php
    namespace App\Middlewares;

    use \Psr\Http\Message\ResponseInterface as Response;
    use \Psr\Http\Message\ServerRequestInterface as Request;

    use App\Helpers\Validation;
    use App\Helpers\Crud;

    class PurchaseMiddlewares {
        public function validationFieldsAddress(Request $request, Response $response, $next){     
            $data = $request->getParsedBody();

            $address = $data["address"];
            $frete = $data["frete"];

            $bairro = $address["bairro"];
            $cidade = $address["cidade"];
            $cep = $address["cep"];

            Validation::checkEmptyFields($address);
            Validation::checkEmptyFields($frete);

            Validation::verifyFieldIsNumeric(["número" => $address["numero"], "cep" => $cep]);

            Validation::onlyLetters(["bairro" => $bairro, "cidade" => $cidade]);

            Validation::onlyLettersAndNumbers(["rua" => $address["rua"]]);
            
            Validation::verifyFieldLength([
                ["$bairro < 3", "O bairro não pode conter menos de 3 caracteres!"],
                ["$cidade < 5", "A cidade não pode conter menos de 5 caracteres!"],
                ["$cep != 8", "O cep precisa conter 8 caracteres!"],
            ]);
            
            $errors = Validation::getErrors();

            return Validation::send($errors, $request, $response, $next);
        }
    }
?>