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
    const [query, setQuery] = useState<string>("");

    const navigate = useNavigate();

    const handleSearch = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setQuery("");
        navigate(`/products/search?query=${query}`, {state: {action: "form"}});
    }

    return ( 
        <ContainerHeader id="header">
           <Navbar state={query} handleSearch={handleSearch} handleChange={setQuery} />
           <NavbarMobile state={query} handleSearch={handleSearch} handleChange={setQuery} />
        </ContainerHeader>
    );
}
 
export default Header;