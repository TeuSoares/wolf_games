// Utils
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FormEvent, useEffect, useState } from "react";

// STyles
import { Button, Container, Form } from "../../../styles/Utils";
import { Frete } from "./styles";

// Hooks
import useQuery from "../../../hooks/useQuery";
import useMessage from "../../../hooks/useMessage";
import useChangeInput from "../../../hooks/useChangeInput";
import { useSearch } from "../../../hooks/useSearch";

// Components
import InputAnimated from "../../../components/Layout/Form/Input";
import Loading from "../../../components/Layout/Loading";

const Address = () => {
    const [loading, setLoading] = useState<boolean>(false);

    const [frete, setFrete] = useState<object>();
    const [sedex, setSedex] = useState<{value: string; deadline: string}>();
    const [pac, setPac] = useState<{value: string; deadline: string}>();

    const { dataForm, handleChange } = useChangeInput();
    const { msg, handleSetMessage } = useMessage();

    const handleQuery = useQuery();

    const { id_pedido } = useParams();

    const { state } = useLocation();

    const query = useSearch();
    const qtd = query.get("qtd");

    const navigate = useNavigate();

    useEffect(() => {
        const calculateFrete = async () => {
            if(dataForm && Object.hasOwn(dataForm, 'cep')){
                if(dataForm.cep.length == 8){
                    const sedex = {
                        destinationCEP: dataForm.cep,
                        service: "sedex",
                        qtd: qtd
                    }
    
                    const pac = {
                        destinationCEP: dataForm.cep,
                        service: "pac",
                        qtd: qtd
                    }
    
                    const responseSedex = await handleQuery("POST", "product/frete", sedex);
    
                    if(responseSedex.status === "success"){
                        setSedex(responseSedex.data);
                    }else{
                        handleSetMessage(responseSedex.data, true);
                    }
    
                    const responsePac = await handleQuery("POST", "product/frete", pac);
    
                    if(responsePac.status === "success"){
                        setPac(responsePac.data);
                    }else{
                        handleSetMessage(responsePac.data, true);
                    }
                }
            }
        }

        calculateFrete();
    }, [dataForm]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoading(true);

        const values = {
            address: {
                ...dataForm
            },
            frete: {
                ...frete
            }
        }

        const { status, data } = await handleQuery("POST", `purchase/deliveryAddress/${id_pedido}`, values, "protected");

        if(status === "success") {
            navigate(`/purchase/review/${data.id_pedido}`, {state: {redirect: "address"}});
        }else if(status === "error"){
            setLoading(false);
            handleSetMessage(data, true);
        }
    }

    return ( 
        <Container displayFlex justifyContent="center" alignItems="center">
            <Form width="500px" onSubmit={handleSubmit}>
                <h1>Endereço de entrega</h1>
                {msg && msg}
                <InputAnimated 
                    type="text" 
                    name="rua"
                    handleChange={handleChange} 
                    label="Rua"
                />
                <InputAnimated 
                    type="text" 
                    name="numero"  
                    handleChange={handleChange} 
                    label="Número"
                />
                <InputAnimated 
                    type="text" 
                    name="bairro"  
                    handleChange={handleChange} 
                    label="Bairro"
                />
                <InputAnimated 
                    type="text" 
                    name="cidade"  
                    handleChange={handleChange} 
                    label="Cidade"
                />
                <InputAnimated 
                    type="text" 
                    name="cep"  
                    handleChange={handleChange} 
                    label="CEP"
                />
                {!loading ? (
                    <Button width="100%" type="submit">
                        Inserir e avançar
                    </Button>
                ) : (
                    <Button width="100%" type="submit" disabled>
                        <Loading status button />
                    </Button>
                )}
                <span>Escolha o frete</span>
                {sedex && pac && (
                    <Frete>
                        <input type="radio" name="frete" onChange={() => setFrete({servico: "sedex", valor_frete: sedex!.value[0].replace(",", ".")})} /> <span>Sedex: R$ {sedex!.value[0]} - {sedex!.deadline[0]} dias</span>
                        <br />
                        <input type="radio" name="frete" onChange={() => setFrete({servico: "pac", valor_frete: pac!.value[0].replace(",", ".")})}/> <span>Pac: R$ {pac!.value[0]} - {pac!.deadline[0]} dias</span>
                    </Frete>
                )}
            </Form>
        </Container>
    );
}
 
export default Address;