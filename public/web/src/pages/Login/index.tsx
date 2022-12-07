import { Link } from "react-router-dom";
import { Container, AnimationInputText, Button } from "../../styles/styles";
import { Items } from "./styles";

const Login = () => {
    return ( 
        <Container displayFlex justifyContent="center" alignItems="center">
            <Items>
                <h1>Fazer Login</h1>
                <form>
                    <AnimationInputText 
                        width="100%" 
                        color="#fff" 
                        inputBorder="#fff" 
                        backgroundLabel="#161618"
                    >
                        <input type="email" id="email" required />
                        <label htmlFor="email">E-mail</label>
                    </AnimationInputText>
                    <AnimationInputText 
                        width="100%" 
                        color="#fff" 
                        inputBorder="#fff" 
                        backgroundLabel="#161618"
                    >
                        <input type="password" id="password" required />
                        <label htmlFor="senha">Senha</label>
                    </AnimationInputText>
                    <Button width="100%" type="submit">Entrar</Button>
                </form>
                <span>Novo na Wolf Games?</span>
                <Link to="/register">Cadastre-se</Link>
            </Items>
        </Container>
    );
}
 
export default Login;