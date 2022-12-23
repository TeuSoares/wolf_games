import styled, {css} from "styled-components";

interface PropsImgInterface {
    button?: boolean;
}

export const Box = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    ${({button}: PropsImgInterface) => button && css`
        img{
            width: 20px;
            height: 20px;
            object-fit: cover;
        }
    `}
`