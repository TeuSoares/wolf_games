import styled from "styled-components";

export const Card = styled.div`
    width: 370px;
    border-radius: 8px;
    margin: 1.5rem .62rem 1.5rem 0;

    @media (max-width: 368){
        width: 100%;
    }

    @media (max-width: 800px) {
        margin: 1.5rem 0;
    }
`

export const ImageCard = styled.div`
    img{
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
    }
`

export const Item = styled.div`
    display: flex;
    flex-direction: column;
    padding: 2rem 1.5rem;
    background-color: #313132;

    h3{
        color: #fff;
        margin-bottom: 2.5rem;
        font-size: 1.1em;
    }

    span{
        margin-bottom: 1.5rem; 
    }

    .category{
        width: 85px;
        font-weight: bold;
        text-transform: uppercase;
        padding: .5rem;
        background-color: #9466ff;
        color: #fff;
        text-align: center;
        font-size: .8em;
    }

    .budge{
        font-size: 1.3em;
        font-weight: bold;
        color: #fff;
    }
`