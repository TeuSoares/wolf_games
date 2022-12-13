import styled from "styled-components";

export const ContainerProfile = styled.div`
    width: 600px;
    margin: 0 auto;

    img{
        width: 100%;
        height: 150px;
    }

    @media (max-width: 598px) {
        width: 100%;
        padding-left: 1em;
        padding-right: 1em;
    }
`

export const ProfileHeader = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 1.5rem;

    h1{
        color: #9466ff;
        align-self: center;
    }

    @media (max-width: 498px) {
        h1{
            font-size: 1.5em;
        }
    }

    @media (max-width: 280px) {
        h1{
            font-size: 1.2em;
        }
    }
`

export const Items = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #000;

    @media (max-width: 598px) {
        flex-direction: column;
    }
`

export const Key = styled.div`
    width: 20%;
    background-color: #9466ff;
    padding: .7rem 1rem;
    text-align: center;
    color: #fff;
    text-transform: uppercase;
    font-size: .9em;

    @media (max-width: 598px) {
        width: 100%;
    }
`

export const Value = styled.div`
    width: 80%;
    text-align: center;
    padding: .7rem 0;
    background-color: #fff;

    @media (max-width: 598px) {
        width: 100%;
    }
`