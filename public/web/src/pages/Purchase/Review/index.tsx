// Utils
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

// Styles
import { Button, Container, Title } from "../../../styles/Utils";
import { Box, Card, Foot, Info, Items, Product } from "./styles";

// Hooks
import useQuery from "../../../hooks/useQuery";
import useMessage from "../../../hooks/useMessage";

// Components
import Loading from "../../../components/Layout/Loading";

interface IProducts {
    id_produto: string;
    nome: string;
    imagem: string;
    quantidade: string;
    subtotal: string;
}

interface InfoInterface {
    nome: string;
    cpf: string;
    email: string;
    rua: string;
    bairro: string;
    cidade: string;
    cep: string;
    servico: string;
    valor_frete: string;
    valor_pedido: string;
    numero: string;
}

const Review = () => {
    const [info, setInfo] = useState<InfoInterface>();
    const [products, setProducts] = useState<IProducts[]>();
    const [total, setTotal] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false);

    const { msg, handleSetMessage } = useMessage();

    const handleQuery = useQuery();

    const { id_pedido } = useParams();

    const { state } = useLocation();

    const navigate = useNavigate();

    useEffect(() => {
        const validationSession = () => {
            switch(state){
                case !state.redirect:
                    navigate("/cart");
                break;
                case state.redirect !== "address":
                    navigate("/cart");
                break;
                case state.redirect !== "paymentStatus":
                    navigate("/cart");
                break;
            }
        }

        validationSession();
    }, []);

    useEffect(() => {
        const getRequestToReview = async () => {
            const { status, data } = await handleQuery("GET", `purchase/review/${id_pedido}`, {}, "protected");

            if(status === "success") {
                setInfo(data.info[0]);
                setProducts(data.products);
                setTotal((parseFloat(data.info[0].valor_pedido) + parseFloat(data.info[0].valor_frete)).toFixed(2));
            }else if(status === "error"){
                handleSetMessage(data, false);
            }
        }

        getRequestToReview();
    }, []);

    const handleDelete = async () => {
        setLoading(true);

        const { status, data } = await handleQuery("DELETE", `purchase/delete/${id_pedido}`, {}, "protected");

        if(status === "success") {
            navigate("/profile/requests", {state: data});
        }else if(status === "error"){
            setLoading(false);
            handleSetMessage(data, true);
        }
    }

    const handleRedirectCheckout = () => {
        navigate("/purchase/checkout", {state: {redirect: "review", amount: total, id_pedido: id_pedido, email: info!.email}});
    }

    return ( 
        <Container>
            <Title>Revise seu pedido</Title>
            {msg && msg}
            {msg || products && info ? <Loading status={false} /> : <Loading status={true} />}
            {products && info && (
                <Box>
                    <Card>
                        <h3>Dados pessoais</h3>
                        <Items>
                            <Info>
                                <h4>Nome:</h4>
                                <span>{info.nome}</span>
                            </Info>
                            <Info>
                                <h4>CPF:</h4>
                                <span>{info.cpf}</span>
                            </Info>
                            <Info>
                                <h4>E-mail:</h4>
                                <span>{info.email}</span>
                            </Info>
                        </Items>
                    </Card>
                    <Card>
                        <h3>Endereço de entrega</h3>
                        <Items>
                            <Info>
                                <h4>Rua:</h4>
                                <span>{info.rua}</span>
                            </Info>
                            <Info>
                                <h4>Número:</h4>
                                <span>{info.numero}</span>
                            </Info>
                            <Info>
                                <h4>Bairro:</h4>
                                <span>{info.bairro}</span>
                            </Info>
                            <Info>
                                <h4>Cidade:</h4>
                                <span>{info.cidade}</span>
                            </Info>
                            <Info>
                                <h4>CEP:</h4>
                                <span>{info.cep}</span>
                            </Info>
                            <Info>
                                <h4>Frete:</h4>
                                <span>{info.servico} - R$ {info.valor_frete}</span>
                            </Info>
                        </Items>
                    </Card>
                    <Card>
                        <h3>Produtos</h3>
                        <Items>
                            {products.map(item => (
                                <Product key={item.id_produto}>
                                    <img src={`http://localhost:8080/uploads/${item.imagem}`} alt={item.nome} />
                                    <div>
                                        <h5>{item.nome}</h5>
                                        <span>Código: {item.id_produto}</span>
                                        <span>Quantidade: {item.quantidade}</span>
                                        <span>Subtotal: R$ {item.subtotal}</span>
                                    </div>
                                </Product>
                            ))}
                        </Items>
                    </Card>
                    <Foot>
                        <div>
                            <span>Total: R$ {total}</span>
                        </div>
                        <div>
                            {!loading ? (
                                <Button type="button" background="#ce3434" backgroundHover="#9e3535" onClick={handleDelete}>Cancelar</Button>
                            ) : (
                                <Button type="button" disabled background="#ce3434" backgroundHover="#9e3535">
                                    <Loading status={true} button />
                                </Button>
                            )}
                            <Button type="button" onClick={handleRedirectCheckout}>Escolher forma de pagamento</Button>
                        </div>
                    </Foot>
                </Box>
            )}
        </Container>
    );
}
 
export default Review;