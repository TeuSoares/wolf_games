import { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import imgLoading from "F:/Programação/Desenvolvimento/projetos/wolfGames/cliente/public/web/src/assets/loading.svg";

// Hooks
import useMessage from "../../../hooks/useMessage";
import useQuery from "../../../hooks/useQuery";

// Interfaces
import { DataProductsInterface } from "../../../interfaces/Products";

// Styles
import { Container } from "../../../styles/Utils"
import { HeaderProductsBrand, Items } from "./styles";

// Components
import ProductCard from "../../../components/ProductCard";

interface SeriesInterface {
    serie: string;
}

const ProductsBrand = () => {
    const [products, setProducts] = useState<Array<DataProductsInterface>>();
    const [series, setSeries] = useState<Array<SeriesInterface>>();
    const [loading, setLoading] = useState<boolean>(true);

    const [serie, setSerie] = useState<string>(""); 
    const [category, setCategory] = useState<string>(""); 

    const { msg, handleSetMessage } = useMessage();

    const handleQuery = useQuery();

    const { brand } = useParams();

    useEffect(() => {
        const getProducts = async () => {
            let url = `product/${brand}`;

            if(serie != "default" && category != "default") {
                if(serie && !category){
                    url = `product/${brand}?serie=${serie}`
                }else if(!serie && category){
                    url = `product/${brand}?category=${category}`
                }else if(serie && category){
                    url = `product/${brand}?serie=${serie}&category=${category}`
                }
            }

            const { status, data } = await handleQuery("GET", url);

            if(status === "success") {
                setLoading(false);
                setProducts(data["products"]);
                setSeries(data["series"]);
            }else if(status === "error"){
                setLoading(false);
                handleSetMessage(data, false);
                setProducts(undefined);
            }
        }

        getProducts();
    }, [brand, series, category]);

    const handleChangeSerie = (e: ChangeEvent<HTMLSelectElement>) => {
        setSerie(e.target.value);
    }

    const handleChangeCategory = (e: ChangeEvent<HTMLSelectElement>) => {
        setCategory(e.target.value);
    }

    return ( 
        <Container displayFlex flexDirection="column" alignItems="center">
            <HeaderProductsBrand>
                <h1>Marca: {brand}</h1>
                <div>
                    <select name="serie" onChange={handleChangeSerie}>
                        <option value="default">Escolha uma série</option>
                        {!loading && (
                            <>
                                {series!.map((item) => (
                                    <option key={item.serie} value={item.serie}>{item.serie}</option>
                                ))}
                            </>
                        )}
                    </select>
                    <select name="category" onChange={handleChangeCategory}>
                        <option value="default">Escolha uma categoria</option>
                        <option value="console">Consoles</option>
                        <option value="game">Games</option>
                    </select>
                </div>
            </HeaderProductsBrand>
            {msg && msg}
            {!loading ? (
                <>
                    {products && (
                        <Items>
                            {products!.map(item => (
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
                </>
            ) : <img src={imgLoading} />}
        </Container>
    );
}
 
export default ProductsBrand;