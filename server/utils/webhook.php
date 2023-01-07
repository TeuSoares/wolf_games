<?php
    require_once __DIR__ . "/../vendor/autoload.php";

    // This is your Stripe CLI webhook secret for testing your endpoint locally.
    $endpoint_secret = 'whsec_d132c5d9f32becbf5ec2ab39ae29257b8affafef9df4b82905e493360d79c4b0';

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
            print_r($paymentIntent);
        default:
            echo 'Received unknown event type ' . $event->type;
    }

    http_response_code(200);

?>