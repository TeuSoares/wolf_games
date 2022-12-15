<?php
    namespace App\Config;

    $dotenv = \Dotenv\Dotenv::createImmutable(__DIR__ . "/../../");
    $dotenv->load();

    class Connection {
        private static $host;
        private static $dbname;
        private static $username;
        private static $password;

        public static function getConnection(){
            self::$host = $_ENV["DB_HOST"];
            self::$dbname = $_ENV["DB_NAME"];
            self::$username = $_ENV["DB_USERNAME"];
            self::$password = $_ENV["DB_PASSWORD"];

            try{

                $conn = new \PDO('mysql:host='.self::$host.';dbname='.self::$dbname,self::$username,self::$password);
                $conn->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
                $conn->exec("SET CHARACTER SET utf8");
                
                return $conn;
            }catch(\PDOException $e){
                die('ERROR: ' . $e->getMessage());
            }
        }
    }
?>