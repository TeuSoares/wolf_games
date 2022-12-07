import styled, { css } from "styled-components";

interface Props {
    displayFlex?: boolean;
    flexDirection?: string;
    justifyContent?: string;
    alignItems?: string;
}

export const Container = styled.div`
    width: 1140px;
    margin: 0 auto;

    ${({displayFlex}: Props) => displayFlex && css`
        display: flex;
        flex-direction: ${({flexDirection}: Props) => flexDirection ? flexDirection : "row"};
        justify-content: ${({justifyContent}: Props) => justifyContent ? justifyContent : "space-between"};
        align-items: ${({alignItems}: Props) => alignItems};
        flex-wrap: wrap;
    `};

    @media (max-width: 1138px) {
        width: 100%;
        padding-left: 1em;
        padding-right: 1em;
    }
`