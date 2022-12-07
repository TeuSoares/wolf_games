import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body{
        font-family: Verdana, Geneva, Tahoma, sans-serif;
    }

    body::-webkit-scrollbar {
    width: 8px;
    background-color: #1b1b1b;
    }
    
    body::-webkit-scrollbar-thumb {
        background-color: #9466ff;
        border-radius: 5px;
    }

    ul{
        list-style: none;
    }

    main{
        /* height: 70vh; */
        background-color: #161618;
        padding-top: 50px;
        padding-bottom: 50px;
    }

    a{
        color: #fff;
        text-decoration: none;
        transition: all 0.5s ease;
    }

    a:hover{
        color: #9466ff;
    }

    p{
        font-size: .9em;
        line-height: 24px;
    }
`