// Utils
import { useState, FormEvent } from "react";

// Stripe
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";

// Styles
import { Button } from "../../../../styles/Utils";

// Hooks
import useMessage from "../../../../hooks/useMessage";

// Components
import Loading from "../../../../components/Layout/Loading";

interface Props {
    idPedido: string;
    email: string;
}

const CheckoutForm = ({idPedido, email}: Props) => {
    const stripe = useStripe();
    const elements = useElements();

    const [isLoading, setIsLoading] = useState(false);

    const { msg, handleSetMessage } = useMessage();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsLoading(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                payment_method_data: {
                    billing_details: {
                        email: email
                    }
                },
                return_url: `http://127.0.0.1:5173/order/${idPedido}/complete`
            },
        });

        if (error) {
            handleSetMessage({
                status: "error",
                message: error.message
            }, true);
        } else {
            handleSetMessage({
                status: "error",
                message: "Houve algum erro. Tente novamente!"
            }, true);
        }

        setIsLoading(false);
    };

    const layout: any = "tabs";

    const paymentElementOptions = {
        layout,
    }

  return (
    <>
        {msg && msg}
        <form id="payment-form" onSubmit={handleSubmit}>
            <PaymentElement id="payment-element" options={paymentElementOptions} />
            <Button disabled={isLoading || !stripe || !elements} id="submit" width="100%">
                {isLoading ? <Loading status={true} button /> : "PAGAR AGORA"}
            </Button>
        </form>
    </>
  );
}

export default CheckoutForm;