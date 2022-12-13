<?php
    namespace App\Helpers;

    header("Access-Control-Allow-Origin:*");

    use App\Config\Connection;
    use App\Helpers\Messages;

    class Crud {
        private $connection;
        public $statement;

        public function __construct(){
            $this->connection = Connection::getConnection();
        }

        public function execute(string $query, array $binds = [], $params = null){
            try{
                $this->statement = $this->connection->prepare($query);

                if(count($binds) > 0){
                    foreach($binds as $item){
                        $this->statement->bindParam($item["0"], $item["1"]);
                    }
                }

                $this->statement->execute($params);

            }catch(\PDOException $e){
                http_response_code(500);
                die(json_encode(Messages::setMessage("error", "Houve algum problema no servidor. Tente novamente mais tarde!")));
            }
        }

        public function insert(string $tabela, array $data, string $message = "Cadastro realizado com sucesso!"){
            $fields = array_keys($data);
            $binds  = array_pad([],count($fields),'?');
            $values = array_values($data);
        
            $query = 'INSERT INTO ' . $tabela . ' (' . implode(',', $fields) . ') VALUES (' . implode(',', $binds) . ')';
        
            $response = $this->execute($query, [] ,$values);

            return Messages::setMessage("success", $message);
        }

        public function select(array $config){
            $where = isset($config["where"]) ? " WHERE " . $config['where'] : "";
            $join = isset($config["join"]) ? $config['join'] : "";
            $others = isset($config["others"]) ? $config['others'] : "";
            $fields = isset($config["fields"]) ? $config['fields'] : "*";
        
            $query = "SELECT " . $fields . " FROM " . $config['table'] . " " . $join . $where . $others;
        
            $this->execute($query, $config["values"]);

            return $this->statement->fetchAll(\PDO::FETCH_ASSOC);
        }

        public function update(array $config){
            $setFields = "";

            if(gettype($config["fields"]) == "array"){
                foreach(array_keys($config["fields"]) as $field){
                    $setFields.= $field . " = " . ":" . $field . ",";
                }

                $setFields = rtrim($setFields, ",");

                foreach($config["fields"] as $key => $value){
                    array_push($config["values"], [":$key", $value]);
                }
            }else{
                $setFields = $config["fields"];
            }
        
            $query = "UPDATE " . $config["table"] . " SET " . $setFields . " WHERE " . $config["where"];
        
            $response = $this->execute($query, $config["values"]);

            if(!isset($config["msg"])){
                $config["msg"] = "Dados atualizados com sucesso!";
            }

            return Messages::setMessage("success", $config["msg"]);
        }

        public function delete(array $config){
            $query = "DELETE FROM " . $config["table"] . " WHERE " . $config["where"];
        
            $response = $this->execute($query, $config["values"]);

            if(!isset($config["msg"])){
                $config["msg"] = "Dados deletados com sucesso!";
            }

            return Messages::setMessage("success", $config["msg"]);
        }    
    }
?>