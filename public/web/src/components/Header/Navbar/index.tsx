import { Link } from "react-router-dom";

import { useEffect, useContext } from "react";

// Icons
import { 
    FaShoppingCart, 
    FaUserCircle, 
    FaSearch,
} from "react-icons/fa";

// Styles
import { Button, Container } from "../../../styles/styles";
import {
    ContainerNavbar,
    Items, 
    Nav,
    LinksHeader,
} from "./styles";
import { AuthContext } from "../../../contexts/AuthContext";

const Navbar = () => {
    const { isAuthenticated } = useContext(AuthContext);

    return ( 
        <ContainerNavbar>
            <Items>
                <Container displayFlex alignItems="center">
                    <Link to="/">
                        <img src="../../../public/logo.png" alt="Logo Wolf Games" />
                    </Link>
                    <form>
                        <input type="text" placeholder="Faça sua pesquisa aqui..." />
                        <Button type="submit">
                            <FaSearch />
                        </Button>
                    </form>
                    <LinksHeader>
                        <div>
                            {!isAuthenticated ? (
                                <Link to="/login">
                                    <FaUserCircle /> Entrar
                                </Link>
                            ) : (
                                <Link to="/profile">
                                    <FaUserCircle /> Perfil
                                </Link>
                            )}
                        </div>
                        <div>
                            <Link to="#">
                                <FaShoppingCart /> 0 itens
                            </Link>
                        </div>
                    </LinksHeader>
                </Container>
            </Items>
            <span></span>
            <Nav>
                <ul>
                    <Container displayFlex>
                        <li>
                            <Link to="#">
                                PlayStation
                            </Link>
                        </li>
                        <li>
                            <Link to="#">
                                XBox
                            </Link>
                        </li>
                        <li>
                            <Link to="#">
                                Nintendo
                            </Link>
                        </li>
                        <li>
                            <Link to="#">
                                Suporte
                            </Link>
                        </li>
                        <li>
                            <Link to="#">
                                Newsletter
                            </Link>
                        </li>
                        <li>
                            <Link to="#">
                                Baixe o App
                            </Link>
                        </li>
                        <li>
                            <Link to="#">
                                Black Friday
                            </Link>
                        </li>
                    </Container>
                </ul>
            </Nav>
        </ContainerNavbar>
    );
}
 
export default Navbar;