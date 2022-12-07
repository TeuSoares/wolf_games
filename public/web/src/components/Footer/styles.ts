import styled from "styled-components";

interface Props {
    align: string;
}

export const Contents = styled.div`
    background-color: #121214;
    padding: 45px 0;
    color: #fff;
`

export const Items = styled.div`
    width: 31%;
    display: flex;
    flex-direction: column;

    div{
        margin-top: 30px;
    }

    div:nth-child(1){
        margin-top: 0;
    }

    h5{
        font-size: 1.1em;
        margin-bottom: 10px;
        color: #9466ff;
    }

    h4{
        font-size: .9em;
        margin-bottom: 10px;
    }

    span{
        font-size: .9em;
    }

    svg{
        font-size: 2.3em;
        margin-right: 8px;
    }

    svg:nth-child(7){
        margin-right: 0;
    }

    .link_wolf_games{
        color: #9466ff;
        font-weight: bold;
        font-size: .9em;
    }

    .link_wolf_games:hover{
        text-decoration: underline;
    }

    ul li{
        margin-bottom: 8px;
    }

    ul li:nth-child(8){
        margin-bottom: 0;
    }

    @media (max-width: 650px) { 
        width: 100%;
        margin-bottom: 50px;
        text-align: center;
        align-items: center;

        &:nth-child(3){
            margin-bottom: 0;
        }
    }

    @media (min-width: 400px) and (max-width: 650px) { 
        p{
            width: 50%;
            margin: 0 auto;
        }
    }
`

export const AlignItemsBox = styled.div`
    display: flex;
    flex-direction: row;
    align-items: ${({align}: Props) => align};
    height: 100%;
`

export const Authorial = styled.div`
    border-top: 2px solid #9466ff;
    padding: 15px 0;
    color: #ccc;
    background-color: #121214;

    span{
        display: block;
    }
`