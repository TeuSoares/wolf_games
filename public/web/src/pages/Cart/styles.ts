import styled from "styled-components";

interface TableInterface {
    width?: string;
    align?: string;
}

export const Box = styled.div`
    @media (max-width: 1138px){
        overflow-x: scroll;
    }
`

export const HeaderCart = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    h1{
        margin-bottom: 0;
    }

    @media (max-width: 350px){
        flex-direction: column;

        h1{
            margin-bottom: 1rem;
        }

        button{
            width: 100%;
        }
    }
`

export const Table = styled.table`
    width: 1140px;
    margin: 1.4rem auto;
    border-collapse: collapse;
    /* white-space: nowrap; */
    color: #fff;

    th{
        padding: 1rem 1.5rem;
        background-color: #8159dd;
        font-size: .7rem;
        text-transform: uppercase;
    }

    .infoProduct{
        width: 35%;
    }

    img {
        width: 100px;
        border-radius: 8px;
        object-fit: cover;
    }
`

export const Td = styled.td`
    width: ${({width}: TableInterface) => width};
    padding: 1rem 1.5rem;
    border-bottom: 1px solid #ccc;
    text-align: ${({align}: TableInterface) => align ? align : "center"};
    background-color: #2e2e2e;

    .trash{
        color: #ce3434;
        font-size: 1.2rem;
        transition: all 0.5s ease;
        cursor: pointer;
    }

    .trash:hover{
        color: #9e3535;
    }

    .font-small{
        font-size: .8rem;
    }

    h2{
        display: inline-block;
        margin-left: 1.2rem;
    }

    h5{
        margin-bottom: 1.5rem;
    }

    .spanProducts{
        display: block;
        font-size: .9rem;
        margin-top: .2rem;
    }
`

export const Stepper = styled.div`
    display: inline-flex;
    justify-content: center;
    align-items: center;

    .valueQtd{
        width: 3rem;
        font-weight: bold;
    }

    div{
        padding: .5rem .8rem;
        background-color: #9466ff;
        border: 1px solid #fff;
    }

    span{
        padding: .5rem .8rem;
        font-weight: bold;
        background-color: #9466ff;
        border: 1px solid #fff;
        cursor: pointer;
        transition: all 0.5s ease;
    }

    span:hover{
        background-color: #8257e5;
    }

    span:nth-child(1){
        border-top-left-radius: 1rem;
        border-bottom-left-radius: 1rem;
    }

    span:nth-child(3){
        border-top-right-radius: 1rem;
        border-bottom-right-radius: 1rem;
    }
`