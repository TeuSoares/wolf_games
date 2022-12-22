import { useEffect, useState, FormEvent } from "react";
import { useParams } from "react-router-dom";
import imgLoading from "F:/Programação/Desenvolvimento/projetos/wolfGames/cliente/public/web/src/assets/loading.svg";

// Hooks
import useMessage from "../../../hooks/useMessage";
import useQuery from "../../../hooks/useQuery";
import useChangeInput from "../../../hooks/useChangeInput";

// Styles
import { Button } from "../../../styles/Utils";
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
    const [loading, setLoading] = useState<boolean>(false);

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
                handleSetMessage(data);
            }
        }

        getProduct();
    }, []);

    const handleCalculateFrete = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoading(true);

        const { status, data } = await handleQuery("POST", `product/frete/${category}`, dataForm);

        if(status === "success") {
            setLoading(false);
            setFrete(data);
        }else if(status === "error"){
            setLoading(false);
            handleSetMessage(data);
            console.log(data);
        }
    }

    return ( 
        <Container>
            {msg && msg}
            {product ? (
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
                                    <span><strong>Calcular o frete</strong></span>
                                    <form onSubmit={handleCalculateFrete}>
                                        <input type="text" name="destinationCEP" placeholder="CEP" required onChange={handleChange} />
                                        <select name="service" required onChange={handleChange}>
                                            <option value=""></option>
                                            <option value="sedex">SEDEX</option>
                                            <option value="pac">PAC</option>
                                        </select>
                                        {!loading ? (
                                            <Button type="submit" onClick={() => setCategory(item.categoria)}>
                                                OK
                                            </Button>
                                        ) : (
                                            <Button type="submit" disabled>
                                                <img className="loading" src={imgLoading} />
                                            </Button>
                                        )}
                                    </form>
                                    {frete && (
                                       <>   
                                            <br />
                                            <span><strong>Valor:</strong> R$ {frete!.value[0]}</span>
                                            <span><strong>Prazo de entrega:</strong> {frete.deadline[0]} dias</span>
                                       </>
                                    )}
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
            ) : <img className="loading" src={imgLoading} />}
        </Container>
    );
}
 
export default ProductID;