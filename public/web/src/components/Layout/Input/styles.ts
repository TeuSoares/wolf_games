import styled from "styled-components";

interface AnimationInputTextProps {
    width?: string;
}

export const AnimationInputText = styled.div`
    width: ${({width}: AnimationInputTextProps) => width ? width : "100%"};
    position: relative;

    label{
        position: absolute;
        left: 16px;
        pointer-events: none;
        transform: translateY(1rem);
        color: #fff;
        font-size: .9em;
        transition: 150ms cubic-bezier(0.4, 0, 0.2, 1);
    }

    input{
        width: 100%;
        margin-bottom: 1.4rem;
        padding: 1rem .7rem;
        border-radius: 5px;
        border: 1px solid #fff;
        background: none;
        color: #fff;
        transition: 150ms cubic-bezier(0.4, 0, 0.2, 1);
    }

    input:focus{
        outline: none;
        border: 1px solid #9466ff;
    }

    input:not(:invalid){
        outline: none;
        border: 1px solid #9466ff;
    }

    input:focus ~ label{
        background-color: #161618;
        transform: translateY(-50%) scale(0.8);
        padding: 0 0.3em;
        color: #9466ff;
    }

    input:not(:invalid) ~ label{
        background-color: #161618;
        transform: translateY(-50%) scale(0.8);
        padding: 0 0.3em;
        color: #9466ff;
    }
`