import styled from "styled-components";

export const Items = styled.div`
    width: 500px;
    height: 420px;
    border: 1px solid #9466ff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 30px 60px;

    form{
        width: 100%;
    }

    h1{
        color: #9466ff;
        margin-bottom: 30px;
        text-align: center;
    }

    a{
        text-transform: uppercase;
        font-weight: 500;
        color: #9466ff;
    }

    a:hover{
        text-decoration: underline;
    }

    span{
        margin-top: 30px;
        margin-bottom: 8px;
        color: #fff;
    }

    @media (max-width: 498px) {
        width: 100%;
        height: 100%;

        h1{
            font-size: 1.5em;
        }
    }

    @media (max-width: 280px) {
        width: 100%;
        padding: 30px 20px;

        h1{
            font-size: 1.2em;
        }
    }
`