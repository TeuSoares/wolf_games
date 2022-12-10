<?php
    namespace App\Helpers;

    class Messages {
        private static $status;
        private static $message;
        private static $values;
        private static $response;

        public static function setMessage($status, $message, $values = null){
            self::$status = $status;
            self::$message = $message;
            self::$values = $values;

            self::$response = [
                "status" => self::$status,
                "message" => self::$message,
                "values" => self::$values
            ];

            return self::$response;
        }
    }
?>