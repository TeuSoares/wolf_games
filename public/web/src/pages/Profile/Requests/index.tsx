// Utils
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

// Styles
import { Button, Container, Title } from "../../../styles/Utils";
import { Box, Table, Td } from "./styles";

// Hooks
import useMessage from "../../../hooks/useMessage";
import useQuery from "../../../hooks/useQuery";

// Components
import Loading from "../../../components/Layout/Loading";

interface InfoRequest {
    id_pedido: string;
    data: string;
    quantidade: string;
    valor_pedido: string;
    status_pedido: string;
}

const Requests = () => {
    const [info, setInfo] = useState<InfoRequest[]>();

    const { msg, handleSetMessage } = useMessage();

    const handleQuery = useQuery();

    useEffect(() => {
        const getInfoRequests = async () => {
            const { status, data } = await handleQuery("GET", "users/profile/requests", {}, "protected");

            if(status === "success") {
                setInfo(data);
            }else if(status === "error"){
                handleSetMessage(data, false);
            }
        }

        getInfoRequests();
    }, []);

    return ( 
        <Container>
            <Title>Meus pedidos</Title>
            {msg && !info && msg}
            {msg || info ? <Loading status={false} /> : <Loading status={true} />}
            {info && !msg && (
                <Box>
                    <Table>
                        <thead>
                            <tr>
                                <th>Código</th>
                                <th>Data</th>
                                <th>Quantidade</th>
                                <th>Valor do pedido</th>
                                <th>Status do pedido</th>
                                <th>#</th>
                            </tr>
                        </thead>
                        <tbody>
                            {info.map(item => (
                                <tr key={item.id_pedido}>
                                    <Td>
                                        <span>{item.id_pedido}</span>
                                    </Td>
                                    <Td>
                                        <span>{item.data}</span>
                                    </Td>
                                    <Td>
                                        <span>{item.quantidade}</span>
                                    </Td>
                                    <Td>
                                        <span>{item.valor_pedido}</span>
                                    </Td>
                                    <Td>
                                        <span>{item.status_pedido}</span>
                                    </Td>
                                    {item.status_pedido == "aberto" ? (
                                        <Td>
                                            <Link to={`/purchase/review/${item.id_pedido}`}>
                                                <Button type="button">Finalizar</Button>
                                            </Link>
                                        </Td>
                                    ) : (
                                        <Td>
                                            <Link to={`/profile/request/${item.id_pedido}`}>
                                                <Button type="button">Visualizar</Button>
                                            </Link>
                                        </Td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Box>
            )}
        </Container>
    );
}
 
export default Requests;