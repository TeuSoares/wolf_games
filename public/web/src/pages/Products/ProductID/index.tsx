import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Hooks
import useMessage from "../../../hooks/useMessage";
import useQuery from "../../../hooks/useQuery";

// Styles
import { Container, ImageProduct, Items, Description, Box, Info, Budge } from "./styles";

// Components
import Loading from "../../../components/Layout/Loading";
import AddCart from "../../../components/AddCart";
import CalculateFrete from "../../../components/CalculateFrete";

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

    const { msg, handleSetMessage } = useMessage();

    const handleQuery = useQuery();

    const { brand, id } = useParams();

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
                                <CalculateFrete qtd={1} responsive />
                                <br />
                                <AddCart className="btn-addCard" idProduct={item.id_produto} />
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