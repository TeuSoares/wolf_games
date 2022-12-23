import styled from "styled-components";

export const PageHome = styled.div`
    .swiper .swiper-slide{
        display: flex;
        justify-content: center;
    }

    .swiper-button-prev, 
    .swiper-button-next{
        color: #9466ff;
    }

    .swiper-pagination-bullet{
        background: #9466ff;
    }
`

export const Banner = styled.div`
    background-color: #25262c;
    margin-top: -4rem;

    img{
        width: 100%;
        object-fit: cover;
    }

    .swiper{
        width: 1140px;
        margin: 0 auto;
    }

    @media (max-width: 1138px){
        .swiper{
            width: 100%;
            margin: 0 auto;
        }
    }
`

export const ProductsFeatured = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;

    @media (max-width: 800px){
        justify-content: center;
    }
`

export const News = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    @media (max-width: 848px){
        justify-content: center;
    }
`