// Utils
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// Hooks
import useMessage from "../../../../hooks/useMessage";
import useQuery from "../../../../hooks/useQuery";

// Styles
import { Container, Title } from "../../../../styles/Utils";
import { Box } from "../styles";
import { Card, Foot, Info, Items, Product } from "./styles";

// Components
import Loading from "../../../../components/Layout/Loading";

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
    status_pedido: string;
    data: string;
}

const RequestID = () => {
    const [info, setInfo] = useState<InfoInterface>();
    const [products, setProducts] = useState<IProducts[]>();
    const [total, setTotal] = useState<string>();

    const { msg, handleSetMessage } = useMessage();

    const handleQuery = useQuery();

    const { id_pedido } = useParams();

    useEffect(() => {
        const getRequestByID = async () => {
            const { status, data } = await handleQuery("GET", `users/profile/requests/${id_pedido}`, {}, "protected");

            if(status === "success") {
                setInfo(data.info[0]);
                setProducts(data.products);
                setTotal((parseFloat(data.info[0].valor_pedido) + parseFloat(data.info[0].valor_frete)).toFixed(2));
            }else if(status === "error"){
                handleSetMessage(data, false);
            }
        }

        getRequestByID();
    }, []);

    return ( 
        <Container>
            <Title>Informações do seu pedido</Title>
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
                            <span>Status: {info.status_pedido}</span>
                        </div>
                        <div>
                            <span>Data: {info.data}</span>
                        </div>
                    </Foot>
                </Box>
            )}
        </Container>
    );
}
 
export default RequestID;