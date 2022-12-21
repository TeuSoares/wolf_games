import styled from "styled-components";

export const Container = styled.div`
    width: 950px;
    background-color: #fff;
    margin: 0 auto;
    border-radius: 5px;

    .loading{
        margin: 0 auto;
    }

    @media (max-width: 948px){
        width: 100%;
    }
`

export const Box = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
`

export const ImageProduct = styled.div`
    width: 50%;

    img{
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 5px;
    }

    @media (max-width: 640px){
        width: 100%;
    }
`

export const Items = styled.div`
    padding: 1.7rem .7rem;
    width: 50%;
    margin-top: .8rem;
    display: flex;
    flex-direction: column;

    h3{
        margin-bottom: 1.5rem;
    }

    .info span{
        display: block;
        margin-bottom: 5px;
        font-size: .9em;
    }

    .budge{
        margin: 3rem 0 1.2rem 0;
    }

    .budge span{
        font-size: 1.7em;
        font-weight: bold;
        color: #9466ff;
    }

    .frete{
        margin-bottom: 1.2rem;
    }

    .frete span{
        display: block;
        font-size: .9em;
        margin-bottom: 5px;
    }

    .frete button{
        font-size: .7em;
        margin-left: 5px;
    }

    .frete button img{
        width: 20px;
        height: 20px;
        object-fit: cover;
    }

    .frete input{
        width: 120px;
        padding: .5rem;
        margin-right: 5px;
    }

    .frete select{
        padding: .5rem;
    }

    @media (max-width: 640px){
        width: 100%;
        align-items: center;
    }
`

export const Description = styled.div`
    width: 100%;
    padding: 1.7rem 2rem;
    margin-bottom: 1.5rem;

    h3{
        text-align: center;
        margin-bottom: 1.5rem;
    }
`