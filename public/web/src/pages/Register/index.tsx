import { Link } from "react-router-dom";
import { Container, AnimationInputText, Button } from "../../styles/styles";
import { Items } from "./styles";

const Register = () => {
    return ( 
        <Container displayFlex justifyContent="center" alignItems="center">
            <Items>
                <h1>Criar Conta</h1>
                <form>
                    <AnimationInputText 
                        width="100%" 
                        color="#fff" 
                        inputBorder="#fff" 
                        backgroundLabel="#161618"
                    >
                        <input type="text" id="name" required />
                        <label htmlFor="name">Nome Completo</label>
                    </AnimationInputText>
                    <AnimationInputText 
                        width="100%" 
                        color="#fff" 
                        inputBorder="#fff" 
                        backgroundLabel="#161618"
                    >
                        <input type="text" id="cpf" required />
                        <label htmlFor="cpf">Cpf</label>
                    </AnimationInputText>
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
                        <input type="text" id="celular" required />
                        <label htmlFor="celular">Celular</label>
                    </AnimationInputText>
                    <AnimationInputText 
                        width="100%" 
                        color="#fff" 
                        inputBorder="#fff" 
                        backgroundLabel="#161618"
                    >
                        <input type="date" id="nascimento" />
                        <label htmlFor="nascimento">Data de Nascimento</label>
                    </AnimationInputText>
                    <AnimationInputText 
                        width="100%" 
                        color="#fff" 
                        inputBorder="#fff" 
                        backgroundLabel="#161618"
                    >
                        <input type="password" id="password" required />
                        <label htmlFor="password">Senha</label>
                    </AnimationInputText>
                    <Button width="100%" type="submit">Finalizar</Button>
                </form>
                <span>Já possui cadastro?</span>
                <Link to="/login">Fazer Login</Link>
            </Items>
        </Container>
    );
}
 
export default Register;