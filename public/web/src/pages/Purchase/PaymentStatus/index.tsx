// Utils
import { useParams } from 'react-router-dom';

// Stripe
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Status from './Status';

const stripePromise = loadStripe("pk_test_51MLSXwDRKjNo6ikLzcG0mLusQJbnhLm4FgDZqyyysKMb79mbcBl0qzstVlCJuv8hRnPaB0FZ5hzWS7HkP5p0jSkL00LRVHbEgw");

const PaymentStatus = () => {
    const { id_pedido } = useParams();

    return (
        <Elements stripe={stripePromise}>
            <Status idPedido={id_pedido} />
        </Elements>
    );
};

export default PaymentStatus;