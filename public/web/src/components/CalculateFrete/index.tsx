// Utils
import { useState, FormEvent } from "react";

// Hooks
import useChangeInput from "../../hooks/useChangeInput";
import useMessage from "../../hooks/useMessage";
import useQuery from "../../hooks/useQuery";

// Styles
import { Button } from "../../styles/Utils";
import { Frete } from "./styles";

interface PropsInterface {
    qtd: number;
    responsive: boolean;
}

const CalculateFrete = ({qtd, responsive}: PropsInterface) => {
    const [frete, setFrete] = useState<{value: string; deadline: string}>();

    const { dataForm, handleChange } = useChangeInput();

    const { msg, handleSetMessage } = useMessage();

    const handleQuery = useQuery();

    const handleCalculateFrete = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const values = {
            ...dataForm,
            qtd: qtd
        }

        const { status, data } = await handleQuery("POST", `product/frete`, values);

        if(status === "success") {
            setFrete(data);
        }else if(status === "error"){
            handleSetMessage(data, true);
            setFrete(undefined);
        }
    }

    return ( 
        <Frete responsive={responsive}>
            <span><strong>Calcular o frete</strong></span>
            <form onSubmit={handleCalculateFrete}>
                <input type="text" name="destinationCEP" placeholder="CEP" required onChange={handleChange} />
                <select name="service" required onChange={handleChange}>
                    <option value=""></option>
                    <option value="sedex">SEDEX</option>
                    <option value="pac">PAC</option>
                </select>
                <Button type="submit">OK</Button>
            </form>
            {frete && (
                <>   
                    <br />
                    <span><strong>Valor:</strong> R$ {frete?.value[0]}</span>
                    <span><strong>Prazo de entrega:</strong> {frete?.deadline[0]} dias</span>
                </>
            )}
            {msg && !frete && msg}
        </Frete>
    );
}
 
export default CalculateFrete;