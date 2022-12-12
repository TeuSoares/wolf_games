<?php
    namespace App\Helpers;

    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\SMTP;
    use PHPMailer\PHPMailer\Exception;

    use App\Helpers\Messages;

    $dotenv = \Dotenv\Dotenv::createImmutable(__DIR__ . "/../../");
    $dotenv->load();

    class Email{
        private $receiver;
        private $subject;
        private $message;

        public function __construct($receiver, $subject, $message){
            $this->receiver = $receiver;
            $this->subject = $subject;
            $this->message = $message;
        }

        private function getServerSettings(){
            $mail = new PHPMailer(true);
            
            $mail->CharSet = "UTF-8";
            $mail->SMTPDebug = false;                      
            $mail->isSMTP();                                            
            $mail->Host       = $_ENV["MAIL_HOST"];                     
            $mail->SMTPAuth   = true;                                   
            $mail->Username   = $_ENV["MAIL_USERNAME"];                     
            $mail->Password   = $_ENV["MAIL_PASSWORD"];                               
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;            
            $mail->Port       = 587;    

            return $mail;
        }

        public function send(){
            $mail = $this->getServerSettings();

            try {
                $mail->setFrom($_ENV["MAIL_SENDER"], "Wolf Games");
                $mail->addAddress($this->receiver);

                $mail->isHTML(true);        
                $mail->Subject = $this->subject;
                $mail->Body    = $this->message;
                $mail->AltBody = $this->message; 

                $mail->send();
                
                return Messages::setMessage("success", "E-mail enviado com sucesso!");
            } catch (Exception $e) {
                echo $mail->ErrorInfo;
                return Messages::setMessage("error", "Houve um problema ao tentar enviar o e-mail!");
            }
        }
    }
?>