import styled, { css } from "styled-components";

interface ContainerProps {
    displayFlex?: boolean;
    flexDirection?: string;
    justifyContent?: string;
    alignItems?: string;
}

interface AnimationInputTextProps {
    width: string;
    color: string;
    inputBorder: string;
    backgroundLabel: string;
}

interface ButtonProps {
    width?: string;
}

interface MessageProps {
    status: string
}

export const ContainerApp = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
`

export const Container = styled.div`
    width: 1140px;
    margin: 0 auto;

    ${({displayFlex}: ContainerProps) => displayFlex && css`
        display: flex;
        flex-direction: ${({flexDirection}: ContainerProps) => flexDirection ? flexDirection : "row"};
        justify-content: ${({justifyContent}: ContainerProps) => justifyContent ? justifyContent : "space-between"};
        align-items: ${({alignItems}: ContainerProps) => alignItems};
        flex-wrap: wrap;
    `};

    @media (max-width: 1138px) {
        width: 100%;
        padding-left: 1em;
        padding-right: 1em;
    }
`

export const Button = styled.button`
    width: ${({width}: ButtonProps) => width};
    border-style: none;
    padding: .8rem 1.2rem;
    border-radius: 5px;
    font-size: 1em;
    cursor: pointer;
    background-color: #9466ff;
    transition: all 0.5s ease;
    color: #fff;

    &:hover{
        background-color: #8257e5;
    }
`

export const AnimationInputText = styled.div`
    width: ${({width}: AnimationInputTextProps) => width};
    position: relative;

    label{
        position: absolute;
        left: 16px;
        pointer-events: none;
        transform: translateY(1rem);
        color: ${({color}: AnimationInputTextProps) => color};
        font-size: .9em;
        transition: 150ms cubic-bezier(0.4, 0, 0.2, 1);
    }

    input{
        width: 100%;
        margin-bottom: 1.4rem;
        padding: 1rem .7rem;
        border-radius: 5px;
        border: ${({inputBorder}: AnimationInputTextProps) => "1px solid" + inputBorder};
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
        background-color: ${({backgroundLabel}: AnimationInputTextProps) => backgroundLabel};
        transform: translateY(-50%) scale(0.8);
        padding: 0 0.3em;
        color: #9466ff;
    }

    input:not(:invalid) ~ label{
        background-color: ${({backgroundLabel}: AnimationInputTextProps) => backgroundLabel};
        transform: translateY(-50%) scale(0.8);
        padding: 0 0.3em;
        color: #9466ff;
    }
`

export const Message = styled.div`
    width: 100%;
    margin-bottom: 1.4rem;
    padding: 1rem .7rem;
    border-radius: 5px;
    color: #fff;
    text-align: center;
    font-size: .9em;

    ${({status}: MessageProps) => status == "success" ? 
        css`
            background-color: rgba(72, 186, 38, 0.2);
            border: 1px solid #48ba2633;
        ` 
    : 
        css`
            background-color: rgb(186, 38, 38, 0.2);
            border: 1px solid #ba2626;
        `};
`