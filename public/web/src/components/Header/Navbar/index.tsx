import { Link } from "react-router-dom";

// Icons
import { 
    FaShoppingCart, 
    FaUserCircle, 
    FaSearch,
} from "react-icons/fa";

// Styles
import { Container } from "../../../styles/styles";
import {
    ContainerNavbar,
    Items, 
    Nav,
    LinksHeader,
} from "./styles";

const Navbar = () => {
    return ( 
        <ContainerNavbar>
            <Items>
                <Container displayFlex alignItems="center">
                    <Link to="#">
                        <img src="../../../public/logo.png" alt="Logo Wolf Games" />
                    </Link>
                    <form>
                        <input type="text" placeholder="Faça sua pesquisa aqui..." />
                        <button type="submit">
                            <FaSearch />
                        </button>
                    </form>
                    <LinksHeader>
                        <div>
                            <Link to="#">
                                <FaUserCircle /> Entrar
                            </Link>
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