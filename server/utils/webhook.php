<?php
    require_once __DIR__ . "/../vendor/autoload.php";

    $dotenv = \Dotenv\Dotenv::createImmutable(__DIR__ . "/.././");
    $dotenv->load();

    use App\Helpers\Crud;

    // This is your Stripe CLI webhook secret for testing your endpoint locally.
    $endpoint_secret = $_ENV["ENDPOINT_SECRET_STRIPE"];

    $payload = @file_get_contents('php://input');
    $sig_header = $_SERVER['HTTP_STRIPE_SIGNATURE'];
    $event = null;

    try {
        $event = \Stripe\Webhook::constructEvent(
            $payload, $sig_header, $endpoint_secret
        );
    } catch(\UnexpectedValueException $e) {
        // Invalid payload
        http_response_code(400);
        exit();
    } catch(\Stripe\Exception\SignatureVerificationException $e) {
        // Invalid signature
        http_response_code(400);
        exit();
    }

    // Handle the event
    switch ($event->type) {
        case 'payment_intent.succeeded':
            $paymentIntent = $event->data->object;

            $id_cliente = $paymentIntent->metadata->user_id;
            $id_pedido = $paymentIntent->metadata->order_id;

            $crud = new Crud;

            $crud->update([
                "table" => "pedidos",
                "fields" => "status_pedido = 'a caminho'",
                "where" => "fk_id_cliente = :id_cliente and id_pedido = :id_pedido",
                "values" => [
                    [":id_cliente", $id_cliente],
                    [":id_pedido", $id_pedido]
                ]
            ]);
        break;
        default:
            echo 'Received unknown event type ' . $event->type;
    }

    http_response_code(200);

?>