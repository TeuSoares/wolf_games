import styled from "styled-components"

export const ContainerNavbar = styled.div`
    display: none;

    @media (min-width: 820px) { 
        display: block;
    }
`

export const Items = styled.div`
    padding: 20px 0;

    form{
        position: relative;
        width: 50%;
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

export const LinksHeader = styled.div`
    div{
        display: inline-block;
    }
    a{
        font-weight: 700;
        display: flex;
        align-items: center;
        text-transform: uppercase;
        font-size: .8em;
    }

    a:nth-child(1){
        margin-right: 10px;
    }

    svg{
        font-size: 1.7em;
        margin-right: 2px;
    }
`

export const Nav = styled.nav`
    ul li{
        width: 14.28%;
        cursor: pointer;
        transition: all 0.5s ease;
    }

    ul li a{
        color: #fff;
        text-decoration: none;
        font-weight: bold;
        padding: 15px 0;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    ul li:hover{
        background: #9466ff;
    }
`