// Utils
import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

// Stripe
import { useStripe } from '@stripe/react-stripe-js';

// Styles
import { Container } from '../../../styles/Utils';
import { Box } from './styles';

// Icons
import { FaWindowClose, FaCheckSquare, FaExclamationCircle} from "react-icons/fa";

interface Props {
    idPedido: string | undefined;
}

const Status = ({idPedido}: Props) => {
    const stripe = useStripe();

    const [title, setTitle] = useState("");
    const [icon, setIcon] = useState<JSX.Element>();
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        if(!stripe){
            return;
        }

        const clientSecret = new URLSearchParams(window.location.search).get(
            'payment_intent_client_secret'
        );

        if(!clientSecret){
            navigate("/profile/requests");
        }

        stripe
            .retrievePaymentIntent(clientSecret!)
            .then(({ paymentIntent }) => {
                switch (paymentIntent!.status) {
                    case "succeeded":
                        // handleQuery("PATCH", `purchase/paymentSucceeded/${id_pedido}`, {}, "protected");
                        setIcon(<FaCheckSquare />);
                        setTitle("Pagamento aprovado");
                        setMessage("Seu pagamento foi aprovado e seu pedido já está a caminho!. Sendo redirecionado, aguarde...");

                        setTimeout(() => {
                            navigate("/profile/requests");
                        }, 5000);
                    break;
                    case "processing":
                        setIcon(<FaExclamationCircle />);
                        setTitle("Pagamento sendo processado");
                        setMessage("Seu pagamento está sendo processado!, você será notificado quando for aprovado. Sendo redirecionado, aguarde...");
                        
                        setTimeout(() => {
                            navigate("/profile/requests");
                        }, 5000);
                    break;
                    case "requires_payment_method":
                        setIcon(<FaWindowClose />);
                        setTitle("Houve um erro");
                        setMessage("Houve um problema ao tentar finalizar seu pagamento, tente novamente com outro método de pagamento. Sendo redirecionado, aguarde...");

                        setTimeout(() => {
                            navigate(`/purchase/review/${idPedido}`, {state: {redirect: "paymentStatus"}});
                        }, 5000);
                    break;
                    default:
                        setIcon(<FaWindowClose />);
                        setTitle("Houve um erro");
                        setMessage("Houve algum erro. Tente novamente mais tarde!");

                        setTimeout(() => {
                            navigate("/profile/requests");
                        }, 5000);
                    break;
                }
            });
    }, [stripe]);

    return ( 
        <Container displayFlex justifyContent="center">
            <Box>
                {icon}
                <h1>{title}</h1>
                <p>{message}</p>
            </Box>
        </Container>
    );
}
 
export default Status;