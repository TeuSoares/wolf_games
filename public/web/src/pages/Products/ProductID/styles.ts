import styled from "styled-components";

export const Container = styled.div`
    width: 950px;
    margin: 0 auto;

    @media (max-width: 948px){
        width: 100%;
        padding-left: 1rem;
        padding-right: 1rem;
    }
`

export const Box = styled.div`
    width: 100%;
    background-color: #fff;
    border-radius: 5px;
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

    .btn-addCard{
        width: 240px;
    }

    @media (max-width: 640px){
        width: 100%;
        align-items: center;
        text-align: center;
    }

    @media (max-width: 325px){
        font-size: .9em;

        .btn-addCard{
            width: 100%;
        }
    }
`

export const Info = styled.div`
    span{
        display: block;
        margin-bottom: 5px;
        font-size: .9em;
    }
`

export const Budge = styled.div`
    margin: 3rem 0 1.2rem 0;

    span{
        font-size: 1.7em;
        font-weight: bold;
        color: #9466ff;
    }

    @media (max-width: 325px){
        span{
            font-size: 1.6em;
        }
    }
`

export const Frete = styled.div`
    margin-bottom: 1.2rem;

    span{
        display: block;
        font-size: .9em;
        margin-bottom: 5px;
    }

    button{
        font-size: .7em;
        margin-left: 5px;
    }

    input{
        width: 120px;
        padding: .5rem;
        margin-right: 5px;
    }

    select{
        padding: .5rem;
    }

    @media (max-width: 325px){
        select, button, input{
            width: 100%;
            margin-top: 8px;
            margin-left: 0;
        }
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