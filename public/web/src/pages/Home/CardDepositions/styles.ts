import styled from "styled-components";

export const BoxDeposition = styled.div`
    width: 370px;
    height: 200px;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: #313132;
    color: #fff;
    border-radius: 5px;

    div{
        display: flex;
        justify-content: space-between;
        font-size: .9em;
    }

    em{
        color: #ccc;
    }

    div span{
        font-weight: bold;
    }

    svg{
        margin-right: 5px;
        color: #ffd066;
    }
`