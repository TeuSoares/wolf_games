import styled from "styled-components";

export const Box = styled.div`
    width: 100%;
    padding: 1.7rem;
    border-radius: .7rem;
    background-color: #121214;

    @media (max-width: 300px){
        padding: 1rem;
    }
`

export const Card = styled.div`
    margin-bottom: 2rem;

    h3{
        margin-bottom: 1rem;
        color: #9466ff;
    }
`

export const Items = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
`

export const Info = styled.div`
    margin: 0 1rem 1rem 0;

    h4{
        color: #fff;
    }

    span{
        color: #ccc;
    }

    @media (max-width: 315px){
        span{
            font-size: .9rem;
        }
    }

    @media (max-width: 260px){
        span{
            font-size: .8rem;
        }
    }
`

export const Product = styled.div`
    width: 45%;
    display: flex;
    margin-bottom: 1rem;

    h5{
        color: #fff;
        margin-bottom: 1rem;
    }

    img {
        width: 100px;
        border-radius: 8px;
        object-fit: cover;
        margin-right: 1rem;
    }

    span{
        display: block;
        font-size: .9rem;
        color: #ccc;
    }

    @media (max-width: 548px){
        width: 100%;
    }

    @media (max-width: 280px){
        h5{
            font-size: .8rem;
        }

        span{
            font-size: .8rem;
        }
    }
`

export const Foot = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #9466ff;
    padding: 1rem 0;

    span{
        color: #fff;
        font-weight: bold;
    }

    button:nth-child(1){
        margin-right: .7rem;
    }

    @media (max-width: 610px){
        flex-direction: column;
    }

    @media (max-width: 455px){
        button{
            width: 100%;
        }

        button:nth-child(1){
            margin-bottom: .7rem;
        }
    }
`