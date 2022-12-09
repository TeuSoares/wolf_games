import styled from "styled-components";

export const Items = styled.div`
    width: 500px;
    border: 1px solid #9466ff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2.3rem 3.5rem;

    h1{
        color: #9466ff;
        margin-bottom: 2rem;
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
        margin-top: 2rem;
        margin-bottom: .6rem;
        color: #fff;
    }

    img{
        width: 20px;
        height: 20px;
        object-fit: cover;
    }

    @media (max-width: 498px) {
        width: 100%;
        padding: 2.3rem 1.5rem;

        h1{
            font-size: 1.5em;
        }
    }

    @media (max-width: 280px) {
        width: 100%;
        padding: 2.3rem 1.2rem;

        h1{
            font-size: 1.2em;
        }
    }
`