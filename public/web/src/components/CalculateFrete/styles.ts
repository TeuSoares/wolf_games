import styled, {css} from "styled-components";

interface Props {
    responsive: boolean;
}

export const Frete = styled.div`
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

    form{
        margin-bottom: 1rem;
    }

    ${({responsive}: Props) => responsive && css`
        @media (max-width: 325px){
            select, button, input{
                width: 100%;
                margin-top: 8px;
                margin-left: 0;
            }
        }
    `};
`