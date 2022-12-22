import { useState, useEffect } from "react";
import imgLoading from "F:/Programação/Desenvolvimento/projetos/wolfGames/cliente/public/web/src/assets/loading.svg";
import { FaStar } from "react-icons/fa";

// Styles
import { Container, Title } from "../../styles/Utils";
import { Banner, ProductsFeatured, Products, News, Depositions } from "./styles";

// Interfaces
import { DataProductsInterface } from "../../interfaces/Products";

// Hooks
import useMessage from "../../hooks/useMessage";
import useQuery from "../../hooks/useQuery";

// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Components
import ProductCard from "../../components/ProductCard";
import CardNews from "./CardNews";
import CardDeposition from "./CardDepositions";

const imgSlider = [
    {   
        name: "Console e Jogo God of War",
        source: "2d9369fd7f.webp"
    },
    {   
        name: "Headset Pulse 3D",
        source: "095fdb4043.webp"
    },
    {   
        name: "PlayStation VR",
        source: "039fc77f30.webp"
    },
    {   
        name: "Jogo The Callisto Protocol",
        source: "f62bb68b23.webp"
    }
];

const Home = () => {
    const [products, setProducts] = useState<Array<DataProductsInterface>>();
    const [productsFeatured, setProductsFeatured] = useState<Array<DataProductsInterface>>();
    const [loading, setLoading] = useState<boolean>(true);

    const { msg, handleSetMessage } = useMessage();

    const handleQuery = useQuery();

    useEffect(() => {
        const getProducts = async () => {
            const { status, data } = await handleQuery("GET", "product/");

            if(status === "success") {
                setLoading(false);
                setProducts(data.products);
                setProductsFeatured(data.productsFeatured);
            }else if(status === "error"){
                setLoading(false);
                handleSetMessage(data);
            }
        }

        getProducts();
    }, []);

    return ( 
        <>
            <Banner>
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    cssMode={true}
                    navigation={true}
                    pagination={true}
                    autoplay={{
                        delay: 3500,
                        disableOnInteraction: false,
                    }}
                >
                    {imgSlider.map(item => (
                        <SwiperSlide key={item.source}>
                            <img src={`/src/assets/banner/${item.source}`} alt={item.name} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Banner>
            <Container>
                <Title align="center">Produtos em destaque</Title>
                <ProductsFeatured>
                    {msg && msg}
                    {!loading ? (
                        <>
                            {productsFeatured?.map(item => (
                                <ProductCard 
                                    key={item!.id_produto}
                                    img={item!.imagem} 
                                    name={item!.nome}
                                    budge={item!.preco_unitario}
                                    category={item!.categoria}
                                    brand={item!.marca}
                                    idProduct={item!.id_produto}
                                />
                            ))}
                        </>
                    ) : <img src={imgLoading} />}
                </ProductsFeatured>

                <Title align="center">+ Produtos</Title>
                {!loading ? (
                    <Products>
                        <Swiper
                            modules={[Pagination, Autoplay]}
                            slidesPerView={3}
                            spaceBetween={30}
                            loop={true}
                            pagination={{
                                clickable: true,
                            }}
                            autoplay={{
                                delay: 3500,
                                disableOnInteraction: false,
                            }}
                            breakpoints={{
                                100: {
                                    slidesPerView: 1,
                                    spaceBetween: 20,
                                },
                                700: {
                                  slidesPerView: 2,
                                  spaceBetween: 20,
                                },
                                1140: {
                                    slidesPerView: 3,
                                    spaceBetween: 20,
                                },
                            }}
                        >
                            {products?.map(item => (
                                <SwiperSlide key={item.id_produto}>
                                    <ProductCard
                                        img={item!.imagem} 
                                        name={item!.nome}
                                        budge={item!.preco_unitario}
                                        category={item!.categoria}
                                        brand={item!.marca}
                                        idProduct={item!.id_produto}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </Products>
                ) : <img src={imgLoading} />}

                <Title align="center">Novidades</Title>
                <News>
                    <CardNews
                        small="Controle"
                        title="Dualsense Edge - PS5"
                        subTitle="Garanta já o seu!"
                        img="1.webp"
                    />
                    <CardNews
                        small="News"
                        title="Telegram da Wolf Games"
                        subTitle="Novidades na palma da mão"
                        img="2.webp"
                    />
                    <CardNews
                        small="Códigos Digitais"
                        title="Xbox"
                        subTitle="Gamepass ultimate em promoção!"
                        img="3.webp"
                    />
                    <CardNews
                        small="Conheça o nosso site de usados"
                        title="Tem games usados aí?"
                        subTitle="A gente compra!"
                        img="4.webp"
                    />
                </News>

                <Title align="center">Depoimentos</Title>
                <Depositions>
                    <Swiper
                        modules={[Pagination, Autoplay]}
                        slidesPerView={3}
                        spaceBetween={30}
                        pagination={{
                            clickable: true,
                        }}
                        autoplay={{
                            delay: 3500,
                            disableOnInteraction: false,
                        }}
                        breakpoints={{
                            100: {
                                slidesPerView: 1,
                                spaceBetween: 20,
                            },
                            700: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            1140: {
                                slidesPerView: 3,
                                spaceBetween: 20,
                            },
                        }}
                    >
                        <SwiperSlide>
                            <CardDeposition
                                name="Canuto J."
                                date="02/12/2022"
                                comment="Facil de comprar e entrega rapida"
                                star={5}
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <CardDeposition
                                name="Ellen L."
                                date="31/10/2022"
                                comment="Loja confiável!"
                                star={4}
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <CardDeposition
                                name="Patrícia S."
                                date="16/12/2022"
                                comment="Todo o processo foi muito ágil, produto foi enviado rápido e chegou sem problemas."
                                star={5}
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <CardDeposition
                                name="Jean M."
                                date="09/12/2022"
                                comment="A entrega foi extremamente rápida."
                                star={4}
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <CardDeposition
                                name="Marco G."
                                date="12/10/2022"
                                comment="Gosto muito de comprar na Wolf Games, recomendo!"
                                star={3}
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <CardDeposition
                                name="Guilherme S."
                                date="08/11/2022"
                                comment="Loja com equipe atenciosa e prestativa."
                                star={5}
                            />
                        </SwiperSlide>
                    </Swiper>
                </Depositions>
            </Container>
        </>
    );
}
 
export default Home;