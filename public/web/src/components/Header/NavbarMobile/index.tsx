import { Link } from "react-router-dom";

// Hooks
import { useState, useRef, useContext } from "react";

// Icons
import { 
    FaShoppingCart,
    FaSearch, 
    FaBars, 
    FaTimes,
} from "react-icons/fa";

// Styles
import { Button, Container } from "../../../styles/styles";
import { 
    ContainerMobile,
    Items, 
    Nav,
    ButtonNavMobile,
} from "./styles";
import { AuthContext } from "../../../contexts/AuthContext";

const NavbarMobile = () => {
    const [navActive, setNavActive] = useState<true | false>(false);

    const { isAuthenticated } = useContext(AuthContext);

    const navActiveRef = useRef<HTMLElement | null>(null);

    const handleNavActive = () => {
        const navActiveRefCurrent =  navActiveRef.current!;

        if(!navActive){
            setNavActive(true);

            let height: number;

            navActiveRefCurrent.style.display = "block";

            height = navActiveRefCurrent.clientHeight;

            navActiveRefCurrent.style.height = "0";

            setTimeout(function(){
                navActiveRefCurrent.style.height = `${height}px`;
            }, 0);
        }else{
            navActiveRefCurrent.style.height = "0";

            navActiveRefCurrent.addEventListener('transitionend', function encolher(){
                navActiveRefCurrent.style.height = "auto";
                navActiveRefCurrent.style.display = "none";

                setNavActive(false);

                navActiveRefCurrent.removeEventListener('transitionend', encolher);
            });
        }
    };

    return ( 
        <ContainerMobile>
            <Items>
                <Container displayFlex flexDirection="column" justifyContent="center" alignItems="center">
                    <ButtonNavMobile>
                            <Button 
                                type="button" 
                                onClick={handleNavActive}
                            >
                                {!navActive ? (<FaBars />) : (<FaTimes />)}
                            </Button>
                        <Link to="#">
                            <img src="../../../public/logo.png" alt="Logo Wolf Games" />
                        </Link>
                        <Button type="button">
                            <Link to="#">
                                <FaShoppingCart />
                            </Link>
                        </Button>
                    </ButtonNavMobile>
                    <form>
                        <input type="text" placeholder="Faça sua pesquisa aqui..." />
                        <Button type="submit">
                            <FaSearch />
                        </Button>
                    </form>
                </Container>
            </Items>
            <span></span>
            <Nav ref={navActiveRef}>
                <ul>
                    <Container>
                        <li>
                            {!isAuthenticated ? (
                                <Link to="/login">
                                    Entrar
                                </Link>
                            ) : (
                                <Link to="/profile">
                                    Perfil
                                </Link>
                            )}
                        </li>
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
        </ContainerMobile>
    );
}
 
export default NavbarMobile;