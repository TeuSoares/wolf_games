<?php
    namespace App\Helpers;

    class Messages {
        private static $status;
        private static $message;
        private static $response;

        public static function setMessage($status, $message){
            self::$status = $status;
            self::$message = $message;

            self::$response = [
                "status" => self::$status,
                "message" => self::$message
            ];

            return self::$response;
        }
    }
?>