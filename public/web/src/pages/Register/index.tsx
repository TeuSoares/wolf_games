import axios from "axios";
import { FormEvent, useState, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { Container, AnimationInputText, Button } from "../../styles/styles";
import { Items } from "./styles";

const Register = () => {
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const dataForm = new FormData(e.target);

        axios.post('http://localhost:8080/api/users/register', dataForm)
        .then((response) => {
            console.log(response.data);
        })
        .catch(error => {
            console.log(error.response.data);
        })
    }

    return ( 
        <Container displayFlex justifyContent="center" alignItems="center">
            <Items>
                <h1>Criar Conta</h1>
                <form onSubmit={handleSubmit}>
                    <AnimationInputText 
                        width="100%" 
                        color="#fff" 
                        inputBorder="#fff" 
                        backgroundLabel="#161618"
                    >
                        <input type="text" name="nome" required />
                        <label htmlFor="nome">Nome Completo</label>
                    </AnimationInputText>
                    <AnimationInputText 
                        width="100%" 
                        color="#fff" 
                        inputBorder="#fff" 
                        backgroundLabel="#161618"
                    >
                        <input type="text" name="cpf" required />
                        <label htmlFor="cpf">Cpf</label>
                    </AnimationInputText>
                    <AnimationInputText 
                        width="100%" 
                        color="#fff" 
                        inputBorder="#fff" 
                        backgroundLabel="#161618"
                    >
                        <input type="email" name="email" required />
                        <label htmlFor="email">E-mail</label>
                    </AnimationInputText>
                    <AnimationInputText 
                        width="100%" 
                        color="#fff" 
                        inputBorder="#fff" 
                        backgroundLabel="#161618"
                    >
                        <input type="text" name="celular" required />
                        <label htmlFor="celular">Celular</label>
                    </AnimationInputText>
                    <AnimationInputText 
                        width="100%" 
                        color="#fff" 
                        inputBorder="#fff" 
                        backgroundLabel="#161618"
                    >
                        <input type="date" name="data_nascimento" />
                        <label htmlFor="data_nascimento">Data de Nascimento</label>
                    </AnimationInputText>
                    <AnimationInputText 
                        width="100%" 
                        color="#fff" 
                        inputBorder="#fff" 
                        backgroundLabel="#161618"
                    >
                        <input type="password" name="senha" required />
                        <label htmlFor="senha">Senha</label>
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