<?php
    namespace App\Middlewares;

    use \Psr\Http\Message\ResponseInterface as Response;
    use \Psr\Http\Message\ServerRequestInterface as Request;

    use App\Helpers\Validation;

    class ProductsMiddlewares {
        public function validationFieldsFrete(Request $request, Response $response, $next){
            $data = $request->getParsedBody();

            $service = $data["service"];
            $destinationCEP = $data["destinationCEP"];

            Validation::checkEmptyFields($data);

            Validation::verifyFieldIsNumeric(["CEP" => $destinationCEP]);

            Validation::verifyFieldLength([
                ["$destinationCEP != 8", "O campo cep de destino precisa conter 8 números"],
            ]);

            Validation::onlyLetters(["serviço" => $service]);

            if($service != "sedex" && $service != "pac"){
                Validation::setErrors("Esse serviço não existe. Selecione a opção PAC ou SEDEX.");
            }

            $errors = Validation::getErrors();

            return Validation::send($errors, $request, $response, $next);
        }

        public function validationFieldSearch(Request $request, Response $response, $next){
            $query = $request->getQueryParam('query');

            $search = [
                "pesquisa" => $query
            ];

            Validation::checkEmptyFields($search);

            Validation::onlyLettersAndNumbers($search);

            $errors = Validation::getErrors();

            return Validation::send($errors, $request, $response, $next);
        }
    }
?>