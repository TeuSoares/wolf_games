import { useEffect, useState, FormEvent } from "react";
import { useParams } from "react-router-dom";

// Hooks
import useMessage from "../../../hooks/useMessage";
import useQuery from "../../../hooks/useQuery";
import useChangeInput from "../../../hooks/useChangeInput";

// Styles
import { Button } from "../../../styles/Utils";
import { Container, ImageProduct, Items, Description, Box, Info, Budge, Frete } from "./styles";

// Components
import Loading from "../../../components/Layout/Loading";

interface DataProductInterface {
    id_produto: number;
    preco_unitario: number;
    imagem: string;
    nome: string;
    categoria: string;
    serie: string;
    quantidade_estoque: number;
    descricao: string;
    marca: string;
}

const ProductID = () => {
    const [product, setProduct] = useState<Array<DataProductInterface>>();

    const [frete, setFrete] = useState<{value: string; deadline: string}>();
    const [category, setCategory] = useState<string>();

    const { msg, handleSetMessage } = useMessage();

    const handleQuery = useQuery();

    const { brand, id } = useParams();

    const { dataForm, handleChange } = useChangeInput();

    useEffect(() => {
        const getProduct = async () => {
            const { status, data } = await handleQuery("GET", `product/${brand}/${id}`);

            if(status === "success") {
                setProduct(data);
            }else if(status === "error"){
                handleSetMessage(data, false);
            }
        }

        getProduct();
    }, []);

    const handleCalculateFrete = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { status, data } = await handleQuery("POST", `product/frete/${category}`, dataForm);

        if(status === "success") {
            setFrete(data);
        }else if(status === "error"){
            handleSetMessage(data, true);
        }
    }

    return ( 
        <Container>
            {msg && msg}
            {msg || product ? <Loading status={false} /> : <Loading status={true} />}
            {product && (
                <>
                    {product.map(item => (
                        <Box key={item.id_produto}>
                            <ImageProduct>
                                <img src={`http://localhost:8080/uploads/${item.imagem}`} alt={item.nome} />
                            </ImageProduct>
                            <Items>
                                <h3>{item.nome}</h3>
                                <Info>
                                    <span><strong>Código:</strong> {item.id_produto}</span>
                                    <span><strong>Estoque:</strong> {item.quantidade_estoque}</span> 
                                    <span><strong>Marca:</strong> {item.marca}</span> 
                                    <span><strong>Série:</strong> {item.serie}</span> 
                                </Info>
                                <Budge>
                                    <span>R$ {item.preco_unitario}</span>
                                </Budge>
                                <Frete>
                                    <span><strong>Calcular o frete</strong></span>
                                    <form onSubmit={handleCalculateFrete}>
                                        <input type="text" name="destinationCEP" placeholder="CEP" required onChange={handleChange} />
                                        <select name="service" required onChange={handleChange}>
                                            <option value=""></option>
                                            <option value="sedex">SEDEX</option>
                                            <option value="pac">PAC</option>
                                        </select>
                                        <Button type="submit" onClick={() => setCategory(item.categoria)}>OK</Button>
                                    </form>
                                    {frete && (
                                       <>   
                                            <br />
                                            <span><strong>Valor:</strong> R$ {frete!.value[0]}</span>
                                            <span><strong>Prazo de entrega:</strong> {frete.deadline[0]} dias</span>
                                       </>
                                    )}
                                </Frete>
                                <Button className="btn-addCard" type="button">Adicionar ao carrinho</Button>
                            </Items>
                            <Description>
                                <h3>Descrição do produto</h3>
                                <p>{item.descricao}</p>
                            </Description>
                        </Box>
                    ))}
                </>
            )}
        </Container>
    );
}
 
export default ProductID;