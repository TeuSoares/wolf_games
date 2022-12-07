import { Link } from "react-router-dom";
import { Container, AnimationInputText, Button } from "../../styles/styles";
import { Items } from "./styles";

const ValidateEmail = () => {
    return ( 
        <Container displayFlex justifyContent="center" alignItems="center">
        <Items>
            <h1>Verifique seu E-mail</h1>
            <form>
                <AnimationInputText 
                    width="100%" 
                    color="#fff" 
                    inputBorder="#fff" 
                    backgroundLabel="#161618"
                >
                    <input type="text" id="verifyEmail" required />
                    <label htmlFor="verifyEmail">Código</label>
                </AnimationInputText>
                <Button width="100%" type="submit">Validar</Button>
            </form>
            <span>Já verificou?</span>
            <Link to="/login">Fazer Login</Link>
        </Items>
    </Container>
    );
}
 
export default ValidateEmail;