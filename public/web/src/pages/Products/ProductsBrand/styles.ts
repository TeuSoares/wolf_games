import styled from "styled-components";

export const HeaderProductsBrand = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;

    select{
        padding: .8rem 1.2rem;
        border-radius: 5px;
        font-size: .8em;
        margin-right: .5rem;
        background: none;
        color: #fff;
        border: 1px solid #9466ff;
    }

    option{
        color: #000;
    }

    @media (max-width: 850px) {
        flex-direction: column;
        align-items: center;

        h1{
            text-align: center;
        }
    }

    @media (max-width: 438px) {
        select, button{
            width: 100%;
            margin-top: 1rem;
        }
    }

    @media (min-width: 440px) and (max-width: 820px) {
        select, button{
            margin-top: 1rem;
        }

        select{
            width: 48%;
        }

        button{
            width: 100%;
        }
    }
`

export const Items = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;

    @media (max-width: 800px) {
        justify-content: center;
    }
`