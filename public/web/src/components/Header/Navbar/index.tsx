import { Link } from "react-router-dom";

import { FormEvent, useContext } from "react";

// Icons
import { 
    FaShoppingCart, 
    FaUserCircle, 
    FaSearch,
} from "react-icons/fa";

// Styles
import { Button, Container } from "../../../styles/Utils";
import {
    ContainerNavbar,
    Items, 
    Nav,
    LinksHeader,
} from "./styles";
import { AuthContext } from "../../../contexts/AuthContext";

interface NavbarInterface {
    state: string;
    handleSearch: (e: FormEvent<HTMLFormElement>) => void;
    handleChange: React.Dispatch<React.SetStateAction<string>>
}

const Navbar = ({state, handleSearch, handleChange}: NavbarInterface) => {
    const { isAuthenticated } = useContext(AuthContext);

    return ( 
        <ContainerNavbar>
            <Items>
                <Container displayFlex alignItems="center">
                    <Link to="/">
                        <img src="../../../public/logo.png" alt="Logo Wolf Games" />
                    </Link>
                    <form onSubmit={handleSearch}>
                        <input 
                            type="text" 
                            required 
                            placeholder="Faça sua pesquisa aqui..." 
                            onChange={(e) => handleChange(e.target.value)} 
                            value={state}
                        />
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
                            <Link to="/products/playstation">
                                PlayStation
                            </Link>
                        </li>
                        <li>
                            <Link to="/products/xbox">
                                XBox
                            </Link>
                        </li>
                        <li>
                            <Link to="/products/nintendo">
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