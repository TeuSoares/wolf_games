import styled from "styled-components";

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