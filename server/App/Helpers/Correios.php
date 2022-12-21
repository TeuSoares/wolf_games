<?php
    namespace App\Helpers;

    use App\Helpers\Messages;

    class Correios {
        private string $service;
        private string $originCEP;
        private string $destinationCEP;
        private int $weight; // Max 50
        private int $length; // Min 16
        private int $height;
        private int $width; // Min 10
        private array $response = [];

        public function __construct($service, $originCEP, $destinationCEP, $weight, $length, $height, $width){
            $this->service = $service; 
            $this->originCEP = $originCEP;
            $this->destinationCEP = $destinationCEP;
            $this->weight = $weight;
            $this->height = $height;
            $this->width = $width;

            if($length < 16){
                $this->length = 16;
            }else{
                $this->length = $length;
            }
        }

        private function setFrete(){
            $url = 'http://ws.correios.com.br/calculador/CalcPrecoPrazo.aspx';

            $params = [
                'nCdEmpresa' => '',
                'sDsSenha' => '',
                'sCepOrigem' => $this->originCEP,
                'sCepDestino' => $this->destinationCEP,
                'nVlPeso' => $this->weight,
                'nCdFormato' => '1',
                'nVlComprimento' => $this->length,
                'nVlAltura' => $this->height,
                'nVlLargura' => $this->width,
                'nVlDiametro' => '0',
                'sCdMaoPropria' => 'n',
                'nVlValorDeclarado' => '0',
                'sCdAvisoRecebimento' => 'n',
                'StrRetorno' => 'xml',
                'nCdServico' =>  $this->service,
            ];
    
            $params = http_build_query($params);
    
            $curl = curl_init($url . '?' . $params);
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
            $data = curl_exec($curl);
            return simplexml_load_string($data);
        }

        public function calculateFrete(){
            $data = $this->setFrete();

            if($data->cServico->Erro == 0){
                foreach ($data->cServico as $service) {
                    $this->response['value'] = $service->Valor;
                    $this->response['deadline'] = $service->PrazoEntrega;
                }
            }else {
                $this->response = Messages::setMessage("error", "Houve um problema ao calcular o frete!");
            }

            return $this->response;
        }
    }
?>