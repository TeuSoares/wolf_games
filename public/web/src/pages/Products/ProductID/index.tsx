import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import imgLoading from "F:/Programação/Desenvolvimento/projetos/wolfGames/cliente/public/web/src/assets/loading.svg";

// Hooks
import useMessage from "../../../hooks/useMessage";
import useQuery from "../../../hooks/useQuery";

// Styles
import { Button } from "../../../styles/styles";
import { Container, ImageProduct, Items, Description, Box } from "./styles";

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
    const [loading, setLoading] = useState<boolean>(true);

    const { msg, handleSetMessage } = useMessage();

    const handleQuery = useQuery();

    const { brand, id } = useParams();

    useEffect(() => {
        const getProduct = async () => {
            const { status, data } = await handleQuery("GET", `product/${brand}/${id}`);

            if(status === "success") {
                setLoading(false);
                setProduct(data);
            }else if(status === "error"){
                setLoading(false);
                handleSetMessage(data);
            }
        }

        getProduct();
    }, []);

    return ( 
        <Container>
            {msg && msg}
            {!loading ? (
                <>
                    {product && (
                        <>
                            {product.map(item => (
                                <Box key={item.id_produto}>
                                    <ImageProduct>
                                        <img src={`http://localhost:8080/uploads/${item.imagem}`} alt={item.nome} />
                                    </ImageProduct>
                                    <Items>
                                        <h3>{item.nome}</h3>
                                        <div className="info">
                                            <span><strong>Código:</strong> {item.id_produto}</span>
                                            <span><strong>Estoque:</strong> {item.quantidade_estoque}</span> 
                                            <span><strong>Marca:</strong> {item.marca}</span> 
                                            <span><strong>Série:</strong> {item.serie}</span> 
                                        </div>
                                        <div className="budge">
                                            <span>R$ {item.preco_unitario}</span>
                                        </div>
                                        <div className="frete">
                                            <span>Calcular o frete</span>
                                            <input type="text" placeholder="CEP" />
                                            <Button type="button">OK</Button>
                                        </div>
                                        <Button width="50%" type="button">Adicionar ao carrinho</Button>
                                    </Items>
                                    <Description>
                                        <h3>Descrição do produto</h3>
                                        <p>{item.descricao}</p>
                                    </Description>
                                </Box>
                            ))}
                        </>
                    )}
                </>
            ) : <img className="loading" src={imgLoading} />}
        </Container>
    );
}
 
export default ProductID;