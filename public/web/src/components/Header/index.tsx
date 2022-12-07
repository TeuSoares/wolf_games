// Styles
import { 
    ContainerHeader,
} from "./styles";

// Components
import Navbar from "./Navbar";
import NavbarMobile from "./NavbarMobile";

const Header = () => {
    // Funcionalidades

    return ( 
        <ContainerHeader id="header">
           <Navbar />
           <NavbarMobile />
        </ContainerHeader>
    );
}
 
export default Header;