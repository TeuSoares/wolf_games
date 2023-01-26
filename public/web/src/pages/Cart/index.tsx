// Utils
import React, { useState, useEffect, useContext } from "react";
import { FaTrashAlt, FaPlus, FaMinus } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

// Hooks
import useQuery from "../../hooks/useQuery";
import useMessage from "../../hooks/useMessage";

// Styles
import { Button, Container, Title } from "../../styles/Utils"
import { Table, Box, Td, Stepper, HeaderCart } from "./styles";

// Interfaces
import { DataProductsInterface } from "../../interfaces/Products";

// Components
import Loading from "../../components/Layout/Loading";
import CalculateFrete from "../../components/CalculateFrete";

// Contexts
import { AddCarContext } from "../../contexts/AddCarContext";

const Cart = () => {
    const [products, setProducts] = useState<Array<DataProductsInterface>>();
    const [total, setTotal] = useState<number>(0);

    const [productsSession, setProductsSession] = useState<Array<{idProduct: number; qtd: number}>>();
    const [statusDelete, setStatusDelete] = useState<boolean>(false);

    const handleQuery = useQuery();

    const { msg, handleSetMessage } = useMessage();

    const navigate = useNavigate();

    const { handleChangeCar } = useContext(AddCarContext);

    useEffect(() => {
        if(productsSession){
            sessionStorage.setItem("car", JSON.stringify(productsSession));
        }
    }, [productsSession]);

    useEffect(() => {
        const cart = sessionStorage.getItem("car");
        const initialValue = JSON.parse(cart!);

        setProductsSession(initialValue);

        let productsQuery: string = "";

        if(initialValue && initialValue.length > 0){
            for (const product of initialValue) {
                const values: any = Object.values(product);
                productsQuery += values[0] + ",";
            }
    
            productsQuery = productsQuery.slice(0, -1);
        }else{
            productsQuery = "0";
        }

        const getProductsCart =  async () => {
            const { status, data } = await handleQuery("GET", `purchase/cart?products=${productsQuery}`);

            if(status === "success") {
                setProducts(data);
            }else if(status === "error"){
                handleSetMessage(data, true);
                setProducts(undefined);
            }
        }

        getProductsCart();
    }, [statusDelete]);

    useEffect(() => {
        let num = 0;
        
        if(products){
            
            for(const valueProduct of products!) {
                for(const valueProductSession of productsSession!) {
                    if(valueProduct.id_produto == valueProductSession.idProduct){
                        num += (parseFloat(valueProduct.preco_unitario) * valueProductSession.qtd);
                    }
                }
            }
            
            setTotal(num);
        }
    }, [products, productsSession]);

    const handleIncrementAndDecrement = (action: string, id: number) => {
        const productID = productsSession!.filter(item => item.idProduct === id);

        let newQtd: number;

        if(action === "increment"){
            newQtd = productID[0].qtd + 1;
        }else if(action === "decrement"){
            newQtd = productID[0].qtd - 1;
        }

        if(newQtd! <= 0){
            newQtd = 1;
        }else if(newQtd! > 10){
            newQtd = 10;
        }

        const othersProducts = productsSession!.filter(item => item.idProduct !== id);

        setProductsSession([...othersProducts!, {idProduct: id, qtd: newQtd!}]);
    };

    const handleDeleteProduct = (id: number) => {
        const othersProducts = productsSession!.filter(item => item.idProduct !== id);

        setProductsSession(othersProducts);

        handleChangeCar();

        setStatusDelete(!statusDelete);
    };

    const handleInsertProductsOfCart = async () => {
        const valuesOfProducts = [];

        for(const valueProducts of products!) {
            for(const valueSession of productsSession!){
                if(valueProducts.id_produto === valueSession.idProduct){
                    const obj = {
                        ...valueSession,
                        subtotal: parseFloat(valueProducts.preco_unitario) * valueSession.qtd
                    }

                    valuesOfProducts.push(obj);
                }
            }
        }

        const values = {
            info: {
                quantidade: productsSession!.length,
                valor_pedido: total
            },
            products: valuesOfProducts
        }

        const { status, data } = await handleQuery("POST", "purchase/registerResquest", values, "protected");

        if(status === "success") {
            sessionStorage.removeItem("car");
            navigate(`/purchase/address/${data.id_pedido}?qtd=${productsSession!.length}`, {state: {redirect: "cart"}});
        }else if(status === "error"){
            handleSetMessage(data, true);
        }
    }

    return ( 
        <Container>
            <HeaderCart>
                <Title>Carrinho</Title>
                <Button type="button" onClick={handleInsertProductsOfCart}>Finalizar compra</Button>
            </HeaderCart>
            {msg && msg}
            {msg || products ? <Loading status={false} /> : <Loading status={true} />}
            {products && (
                <Box>
                    <Table>
                        <thead>
                            <tr>
                                <th colSpan={2} className="infoProduct">Produto</th>
                                <th>Preço</th>
                                <th>Quantidade</th>
                                <th>Subtotal</th>
                                <th>Excluir</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(item => (
                                <tr key={item.id_produto}>
                                    <Td width="10%">
                                        <Link to={`/products/${item.marca}/${item.id_produto}`}>
                                            <img src={`http://localhost:8080/uploads/${item.imagem}`} alt={item.nome} />
                                        </Link>
                                    </Td>
                                    <Td width="35%" align="left">
                                        <Link to={`/products/${item.marca}/${item.id_produto}`}>
                                            <h5>{item.nome}</h5>
                                        </Link>
                                        <span className="spanProducts">Código: <strong>{item.id_produto}</strong></span>
                                        <span className="spanProducts">Estoque: <strong>{item.quantidade_estoque}</strong></span>
                                    </Td>
                                    <Td width="15%">
                                        <strong className="font-small">R$ {item.preco_unitario}</strong>
                                    </Td>
                                    <Td width="15%">
                                        <Stepper>
                                            <span onClick={() => handleIncrementAndDecrement("decrement", item.id_produto)}><FaMinus /></span>
                                            {productsSession!.map(value => (
                                                <React.Fragment key={value.idProduct}>
                                                    {value.idProduct == item.id_produto && (
                                                        <div className="valueQtd">
                                                            {value.qtd}
                                                        </div>
                                                    )}
                                                </React.Fragment>
                                            ))}
                                            <span onClick={() => handleIncrementAndDecrement("increment", item.id_produto)}><FaPlus /></span>
                                        </Stepper>
                                    </Td>
                                    <Td width="15%">
                                        {productsSession!.map(value => (
                                            <React.Fragment key={value.idProduct}>
                                                {value.idProduct === item.id_produto && (
                                                    <strong>R$ {(parseFloat(item.preco_unitario) * value.qtd).toFixed(2)}</strong>
                                                )}
                                            </React.Fragment>
                                        ))}
                                    </Td>
                                    <Td width="10%">
                                        <FaTrashAlt className="trash" onClick={() => handleDeleteProduct(item.id_produto)} />
                                    </Td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <Td colSpan={2} align="left">
                                    <CalculateFrete qtd={productsSession!.length} responsive={false} />
                                </Td>
                                <Td align="right" colSpan={4}>
                                    <span>Total:</span>
                                    <h2>R$ {(total).toFixed(2)}</h2>
                                </Td>
                            </tr>
                        </tfoot>
                    </Table>
                </Box>
            )}
        </Container>
    );
}
 
export default Cart;