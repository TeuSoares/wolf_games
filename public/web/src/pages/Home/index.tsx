import { useState, useEffect } from "react";

// Styles
import { Container, Title } from "../../styles/Utils";
import { Banner, ProductsFeatured, PageHome, News } from "./styles";

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

// Utils
import { imagesSlider, news, depositions } from "./Utils/data";

// Components
import ProductCard from "../../components/ProductCard";
import CardNews from "./CardNews";
import CardDeposition from "./CardDepositions";
import Loading from "../../components/Layout/Loading";

const Home = () => {
    const [products, setProducts] = useState<Array<DataProductsInterface>>();
    const [productsFeatured, setProductsFeatured] = useState<Array<DataProductsInterface>>();

    const { msg, handleSetMessage } = useMessage();

    const handleQuery = useQuery();

    useEffect(() => {
        const getProducts = async () => {
            const { status, data } = await handleQuery("GET", "product/");

            if(status === "success") {
                setProducts(data.products);
                setProductsFeatured(data.productsFeatured);
            }else if(status === "error"){
                handleSetMessage(data, false);
            }
        }

        getProducts();
    }, []);

    return ( 
        <PageHome>
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
                    {imagesSlider.map(item => (
                        <SwiperSlide key={item.source}>
                            <img src={`/src/assets/banner/${item.source}`} alt={item.name} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Banner>
            <Container>
                <br />
                {msg && !products && !productsFeatured && msg}
                {msg || products || productsFeatured ? <Loading status={false} /> : <Loading status={true} />}
                {products && productsFeatured && (
                    <>
                        <Title align="center" marginTop>Produtos em destaque</Title>
                        <ProductsFeatured>
                            {productsFeatured.map(item => (
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
                        </ProductsFeatured>

                        <Title align="center" marginTop>+ Produtos</Title>
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

                        <Title align="center" marginTop>Novidades</Title>
                        <News>
                            {news.map((item, index) => (
                                <CardNews
                                    key={index}
                                    small={item.small}
                                    title={item.title}
                                    subTitle={item.subtitle}
                                    img={item.img}
                                />
                            ))}
                        </News>

                        <Title align="center" marginTop>Depoimentos</Title>
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
                            {depositions.map((item, index) => (
                                <SwiperSlide key={index}>
                                    <CardDeposition
                                        name={item.author}
                                        date={item.date}
                                        comment={item.comment}
                                        star={item.star}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </>
                )}
            </Container>
        </PageHome>
    );
}
 
export default Home;