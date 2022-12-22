import { useNavigate } from "react-router-dom";
import { useState, FormEvent } from "react";

// Styles
import { 
    ContainerHeader,
} from "./styles";

// Components
import Navbar from "./Navbar";
import NavbarMobile from "./NavbarMobile";

const Header = () => {
    const [query, setQuery] = useState<string | undefined>();

    const navigate = useNavigate();

    const handleSearch = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        navigate(`/products/search?query=${query}`, {state: {action: "form"}});
    }

    return ( 
        <ContainerHeader id="header">
           <Navbar handleSearch={handleSearch} handleChange={setQuery} />
           <NavbarMobile handleSearch={handleSearch} handleChange={setQuery} />
        </ContainerHeader>
    );
}
 
export default Header;