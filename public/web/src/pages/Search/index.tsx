import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import imgLoading from "F:/Programação/Desenvolvimento/projetos/wolfGames/cliente/public/web/src/assets/loading.svg";

// Hooks
import { useSearch } from "../../hooks/useSearch";
import useMessage from "../../hooks/useMessage";
import useQuery from "../../hooks/useQuery";

// Interfaces
import { DataProductsInterface } from "../../interfaces/Products";

// Styles
import { Container, Title } from "../../styles/Utils";

// Components
import ProductCard from "../../components/ProductCard";
import { Items } from "./styles";

const Search = () => {
    const [products, setProducts] = useState<Array<DataProductsInterface>>();
    const [loading, setLoading] = useState<boolean>(true);

    const query = useSearch();
    const search = query.get("query");

    const { state } = useLocation();

    const navigate = useNavigate();

    const { msg, handleSetMessage } = useMessage();
    const handleQuery = useQuery();

    useEffect(() => {
        if(!state || state?.action !== "form"){
            navigate("/");
        }
    }, []);

    useEffect(() => {
        const getProducts = async () => {
            setProducts(undefined);

            const { status, data } = await handleQuery("GET", `product/search?query=${search}`);

            if(status === "success") {
                setLoading(false);
                setProducts(data);
            }else if(status === "error"){
                setLoading(false);
                handleSetMessage(data);
                setProducts(undefined);
            }
        }

        getProducts();
    }, [search]);

    return ( 
        <Container>
            <Title marginTop="0">Resultado de: {search}</Title>
            {!loading ? (
                <>
                    {msg && msg}
                    {products && (
                        <Items>
                            {products!.map(item => (
                                <ProductCard 
                                    key={item!.id_produto}
                                    img={item!.imagem} 
                                    name={item!.nome}
                                    budge={item!.preco_unitario}
                                    category={item!.categoria}
                                    brand={item.marca}
                                    idProduct={item!.id_produto}
                                />
                            ))}
                        </Items>
                    )}
                </>
            ) : <img src={imgLoading} />}
        </Container>
    );
}
 
export default Search;