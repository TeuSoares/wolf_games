import { SyntheticEvent } from "react";

// Styles
import { Container } from "../../styles/styles";
import { 
    Authorial,
    Contents,
    Items,
    AlignItemsBox,
} from "./styles";

// Icons
import { 
    FaCcMastercard,
    FaCcPaypal,
    FaCcVisa,
    FaCcStripe,
    FaCcAmex,
    FaBarcode,
    FaFacebookSquare,
    FaInstagramSquare,
    FaYoutubeSquare,
    FaTwitterSquare,
    FaAngleUp,
} from "react-icons/fa";

const Footer = () => {

    const handleScrollToTop = (e: SyntheticEvent) => {
        e.preventDefault();
        
        const to = document.getElementById("header")!.offsetTop;

        window.scroll({
            top: to,
            behavior: "smooth",
        })
    };

    return ( 
        <footer>
            <Contents>
                <Container displayFlex>
                    <Items>
                        <AlignItemsBox align="flex-start">
                            <img src="../../../public/logo.png" alt="Logo Wolf Games" />
                        </AlignItemsBox>
                        <AlignItemsBox align="center">
                            <div>
                                <h4>Atendimento</h4>
                                <h5>(19) 3545-0715</h5>
                                <span>Seg a Sex - das 9h às 17h</span>
                            </div>
                        </AlignItemsBox>
                        <AlignItemsBox align="flex-end">
                            <div>
                                <h4>Pague com</h4>
                                <FaCcMastercard />
                                <FaCcPaypal />
                                <FaCcVisa />
                                <FaCcStripe />
                                <FaCcAmex />
                                <FaBarcode />
                            </div>
                        </AlignItemsBox>
                    </Items>
                    <Items>
                        <AlignItemsBox align="flex-start">
                            <div>
                                <h4>Sobre</h4>
                                <p>
                                    A Wolf Games, fundada em 2009, é a soma de um amor incondicional pelos games com o fascínio do ecommerce. Atende todo o Brasil, via correios e transportadoras, 
                                    além de ser loja oficial da PlayStation, Xbox, Nintendo e muitas outras!
                                </p>
                            </div>
                        </AlignItemsBox>
                        <AlignItemsBox align="center">
                            <a href="#" className="link_wolf_games">Saiba mais sobre a Wolf Games</a>
                        </AlignItemsBox>
                    </Items>
                    <Items>
                        <AlignItemsBox align="flex-start">
                            <div>
                                <h4>Institucional</h4>
                                <ul>
                                    <li>
                                        <a href="#">Quem Somos</a>
                                    </li>
                                    <li>
                                        <a href="#">Segurança e privacidade</a>
                                    </li>
                                    <li>
                                        <a href="#">Trocas e devoluções</a>
                                    </li>
                                    <li>
                                        <a href="#">Quem conhece a Wolf Games</a>
                                    </li>
                                    <li>
                                        <a href="#">Trabalhe Conosco</a>
                                    </li>
                                    <li>
                                        <a href="#">Newsletter</a>
                                    </li>
                                </ul>
                            </div>
                        </AlignItemsBox>
                        <AlignItemsBox align="flex-end">
                            <div>
                                <h4>Redes Sociais</h4>
                                <a href="https://facebook.com" target="_blank">
                                    <FaFacebookSquare />
                                </a>
                                <a href="https://youtube.com" target="_blank">
                                    <FaYoutubeSquare />
                                </a>
                                <a href="https://instagram.com" target="_blank">
                                    <FaInstagramSquare />
                                </a>
                                <a href="https://twitter.com" target="_blank">
                                    <FaTwitterSquare />
                                </a>
                            </div>
                        </AlignItemsBox>
                    </Items>
                </Container>
            </Contents>
            <Authorial>
                <Container displayFlex alignItems="center">
                    <span>Copyright © 2022</span>
                    <button type="button" onClick={handleScrollToTop}><FaAngleUp /></button>
                </Container>
            </Authorial>
        </footer>
    );
}
 
export default Footer;