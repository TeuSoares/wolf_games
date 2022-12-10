import styled from "styled-components";

export const Box = styled.div`
    width: 500px;
    padding: 2.5rem;
    text-align: center;
    border: 1px solid #9466ff;

    svg{
        font-size: 6em;
        color: #9466ff;
    }

    h1{
        color: #9466ff;
        margin: .8em 0;
        font-size: 1.5em;
    }

    p{
        color: #fff;
        margin-bottom: .8em;
    }

    a{
        color: #9466ff;
        font-weight: 600;
        font-size: .9em;
    }

    a:hover{
        text-decoration: underline;
    }

    @media (max-width: 498px){
        width: 100%;
    }
`