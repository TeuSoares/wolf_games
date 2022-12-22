import styled from "styled-components";

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

    .swiper-button-prev, 
    .swiper-button-next{
        color: #9466ff;
    }

    .swiper-pagination-bullet{
        background: #9466ff;
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

export const Products = styled.div`
    .swiper .swiper-slide{
        display: flex;
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

export const BoxCard = styled.div`
    width: 560px;
    height: 330px;
    margin: 0 0 1.2rem 0;
    padding: 1.5rem ;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 8px;
    border: 1px solid rgb(148, 102, 255, 0.5);
    background-position: center;
    color: #fff;

    small, h3{
        text-transform: uppercase;
    }

    h2{
        width: 300px;
    }

    a{
        width: 120px;
        padding: 1rem;
        border: 1px solid #9466ff;
        font-size: .8em;
        font-weight: bold;
        text-align: center;
        border-radius: 8px;
    }

    @media (min-width: 850px) and (max-width: 1138px){
        width: 420px;
    }

    @media (max-width: 558px){
        width: 100%;

        h2{
            width: 100%;
        }

        h2{
            font-size: 1.3em;
        }
    }
`

export const Depositions = styled.div`
    .swiper .swiper-slide{
        display: flex;
        justify-content: center;
    }
`

export const BoxDeposition = styled.div`
    width: 370px;
    height: 200px;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: #313132;
    color: #fff;
    border-radius: 5px;

    div{
        display: flex;
        justify-content: space-between;
        font-size: .9em;
    }

    em{
        color: #ccc;
    }

    div span{
        font-weight: bold;
    }

    svg{
        margin-right: 5px;
        color: #ffd066;
    }
`