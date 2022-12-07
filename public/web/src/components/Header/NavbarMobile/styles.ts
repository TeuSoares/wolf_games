import styled from "styled-components";

export const ContainerMobile = styled.div`
    display: none;
    position: relative;

    @media (max-width: 818px) { 
        display: block;
    }
`

export const Items = styled.div`
    padding: 20px 0;

    form{
        position: relative;
        width: 100%;
    }

    form input{
        width: 100%;
        background: #fff;
        border-radius: 5px;
        padding: 0.85em 2em;
        font-weight: 300;
        font-size: 1em;
        color: #25262C;
        transition: all 0.1s linear;
        outline-color: #9466ff;
        border: none;
    }

    form button{
        width: 12%;
        height: 100%;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
        position:absolute;
        top:0; 
        right:0;
        z-index:10;
        outline:none;
    }

    form button:hover{
        background-color: #8257e5;
    }
`

export const ButtonNavMobile = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
    margin-bottom: 8px;

    @media (max-width: 818px) { 
        img{
            width: 100%;
            object-fit: cover;
        }
    }
`

export const Nav = styled.nav`
    position: absolute;
    display: none;
    background-color: #121214;
    width: 100%;
    transition: height .5s ease;

    ul li{
        transition: all 0.5s ease;
    }

    ul li a{
        font-weight: bold;
        padding: 15px 0;
        display: flex;
        justify-content: center;
    }

    ul li:hover a{
        color: #9466ff;
    }
`