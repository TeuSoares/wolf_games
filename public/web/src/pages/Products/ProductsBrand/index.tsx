import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Hooks
import useMessage from "../../../hooks/useMessage";
import useQuery from "../../../hooks/useQuery";

// Interfaces
import { DataProductsInterface } from "../../../interfaces/Products";

// Styles
import { Button, Container, Title } from "../../../styles/Utils"
import { HeaderProductsBrand, Items } from "./styles";

// Components
import ProductCard from "../../../components/ProductCard";
import Loading from "../../../components/Layout/Loading";

interface SeriesInterface {
    serie: string;
}

const ProductsBrand = () => {
    const [products, setProducts] = useState<Array<DataProductsInterface> | undefined>();
    const [series, setSeries] = useState<Array<SeriesInterface>>();
    const [filter, setFilter] = useState<boolean>(false);

    const [serie, setSerie] = useState<string>(""); 
    const [category, setCategory] = useState<string>(""); 

    const { msg, handleSetMessage } = useMessage();

    const handleQuery = useQuery();

    const { brand } = useParams();

    useEffect(() => {
        const getProducts = async () => {
            let url = `product/${brand}`;

            setProducts(undefined);

            if(serie || category) {
                if(serie && !category){
                    url = `product/${brand}?serie=${serie}`
                }else if(!serie && category){
                    url = `product/${brand}?category=${category}`
                }else if(serie && category){
                    url = `product/${brand}?serie=${serie}&category=${category}`
                }

                setCategory("");
                setSerie("");
            }

            const { status, data } = await handleQuery("GET", url);

            if(status === "success") {
                setProducts(data["products"]);
                setSeries(data["series"]);
            }else if(status === "error"){
                handleSetMessage(data, false);
                setProducts(undefined);
            }
        }

        getProducts();
    }, [brand, filter]);

    const handleFilter = () => {
        if(serie || category){
            setFilter(!filter);
        }
    }

    return ( 
        <Container displayFlex flexDirection="column" alignItems="center">
            <HeaderProductsBrand>
                <Title>Marca: {brand}</Title>
                <div>
                    <select name="serie" onChange={(e) => setSerie(e.target.value)}>
                        <option value="default">Escolha uma série</option>
                        {products && (
                            <>
                                {series!.map((item) => (
                                    <option key={item.serie} value={item.serie}>{item.serie}</option>
                                ))}
                            </>
                        )}
                    </select>
                    <select name="category" onChange={(e) => setCategory(e.target.value)}>
                        <option value="default">Escolha uma categoria</option>
                        {products && (
                            <>
                                <option value="console">Consoles</option>
                                <option value="game">Games</option>
                            </>
                        )}
                    </select>
                    {products ? <Button type="button" onClick={handleFilter}>Pesquisar</Button> : <Button type="button" disabled>Pesquisar</Button>}
                </div>
            </HeaderProductsBrand>
            {msg || products ? <Loading status={false} /> : <Loading status={true} />}
            {msg && !products && msg}
            {products && (
                <Items>
                    {products.map(item => (
                        <ProductCard 
                            key={item!.id_produto}
                            img={item!.imagem} 
                            name={item!.nome}
                            budge={item!.preco_unitario}
                            category={item!.categoria}
                            brand={brand!}
                            idProduct={item!.id_produto}
                        />
                    ))}
                </Items>
            )}
        </Container>
    );
}
 
export default ProductsBrand;