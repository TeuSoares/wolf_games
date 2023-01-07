// Utils
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Stripe
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

// Hooks
import useQuery from "../../../hooks/useQuery";
import useMessage from "../../../hooks/useMessage";

// Styles
import { Items } from "./styles";
import { Container, Title } from "../../../styles/Utils";

// Components
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe("pk_test_51MLSXwDRKjNo6ikLzcG0mLusQJbnhLm4FgDZqyyysKMb79mbcBl0qzstVlCJuv8hRnPaB0FZ5hzWS7HkP5p0jSkL00LRVHbEgw");

const Checkout = () => {
    const [clientSecret, setClientSecret] = useState("");

    const { state } = useLocation();

    const handleQuery = useQuery();

    const { msg, handleSetMessage } = useMessage();

    const navigate = useNavigate();

    useEffect(() => {
        const validationSession = () => {
            if(state){
                if(!state.redirect){
                    navigate("/cart");
                }else if(state.redirect !== "review"){
                    navigate("/cart");
                }
            }else{
                navigate("/cart");
            }
        }

        validationSession();
    }, []);

    useEffect(() => {
        const createPaymentIntent = async () => {
            const { status, data } = await handleQuery("POST", `purchase/checkout`, {amount: state.amount, id_pedido: state.id_pedido}, "protected");

            if(status === "success") {
                setClientSecret(data.clientSecret);
            }else if(status === "error"){
                handleSetMessage(data, false);
            }
        }

        createPaymentIntent();
    }, []);

    const theme: any = 'night';

    const appearance = {
        theme,
        variables: {
            colorPrimary: '#9466ff',
        },
    };

    const options = {
        clientSecret,
        appearance,
    };

    return ( 
        <Container displayFlex flexDirection="column" justifyContent="center" alignItems="center">
            <Title align="center">Efetue o pagamento</Title>
            {msg && msg}
            <Items>
                {clientSecret && (
                    <Elements options={options} stripe={stripePromise}>
                        <CheckoutForm idPedido={state.id_pedido} email={state.email} />
                    </Elements>
                )}
            </Items>
        </Container>
    );
}
 
export default Checkout;