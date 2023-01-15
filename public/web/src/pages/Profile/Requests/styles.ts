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

export const Table = styled.table`
    width: 1140px;
    margin: 1.4rem auto;
    border-collapse: collapse;
    color: #fff;

    th{
        padding: 1rem 1.5rem;
        background-color: #8159dd;
        font-size: .7rem;
        text-transform: uppercase;
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

    span{
        font-size: .9rem;
    }
`