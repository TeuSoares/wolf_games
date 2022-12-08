import axios from "axios";
import { FormEvent, useState, ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, AnimationInputText, Button, Message } from "../../styles/styles";
import { Items } from "./styles";

interface DataFormInterface {
    nome: string;
    cpf: string;
    celular: string;
    email: string;
    senha: string;
    data_nascimento: string;
}

interface ResponseInterface {
    status: string;
    message: string;
}

const Register = () => {
    const [dataForm, setData] = useState<Array<DataFormInterface>>();
    const [response, setResponse] = useState<ResponseInterface | "">("");
    const [loading, setLoading] = useState<boolean>(false);

    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoading(true);

        try {
            const { data } = await axios.post('http://localhost:8080/api/users/register', dataForm);

            localStorage.setItem('id', data);
            
            navigate("/login", {state: {status: "success", message: "Cadastro realizado com sucesso!"}});
        } catch (error: any) {
            setLoading(false);

            setResponse(error.response.data);

            setTimeout(() => {
                setResponse("");
            }, 5000);
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => setData({ ...dataForm!, [e.target.name]: e.target.value});

    return ( 
        <Container displayFlex justifyContent="center" alignItems="center">
            <Items>
                <h1>Criar Conta</h1>
                {response && <Message status={response.status}>{response.message}</Message>}
                <form onSubmit={handleSubmit}>
                    <AnimationInputText 
                        width="100%" 
                        color="#fff" 
                        inputBorder="#fff" 
                        backgroundLabel="#161618"
                    >
                        <input type="text" name="nome" required onChange={handleChange} />
                        <label htmlFor="nome">Nome Completo</label>
                    </AnimationInputText>
                    <AnimationInputText 
                        width="100%" 
                        color="#fff" 
                        inputBorder="#fff" 
                        backgroundLabel="#161618"
                    >
                        <input type="text" name="cpf" required onChange={handleChange} />
                        <label htmlFor="cpf">CPF</label>
                    </AnimationInputText>
                    <AnimationInputText 
                        width="100%" 
                        color="#fff" 
                        inputBorder="#fff" 
                        backgroundLabel="#161618"
                    >
                        <input type="email" name="email" required onChange={handleChange} />
                        <label htmlFor="email">E-mail</label>
                    </AnimationInputText>
                    <AnimationInputText 
                        width="100%" 
                        color="#fff" 
                        inputBorder="#fff" 
                        backgroundLabel="#161618"
                    >
                        <input type="text" name="celular" required onChange={handleChange} />
                        <label htmlFor="celular">Celular</label>
                    </AnimationInputText>
                    <AnimationInputText 
                        width="100%" 
                        color="#fff" 
                        inputBorder="#fff" 
                        backgroundLabel="#161618"
                    >
                        <input type="date" name="data_nascimento" onChange={handleChange} />
                        <label htmlFor="data_nascimento">Data de Nascimento</label>
                    </AnimationInputText>
                    <AnimationInputText 
                        width="100%" 
                        color="#fff" 
                        inputBorder="#fff" 
                        backgroundLabel="#161618"
                    >
                        <input type="password" name="senha" required onChange={handleChange} />
                        <label htmlFor="senha">Senha</label>
                    </AnimationInputText>
                    {!loading ? (
                        <Button width="100%" type="submit">
                            Finalizar
                        </Button>
                    ) : (
                        <Button width="100%" type="submit" disabled>
                            <img src="src/assets/loading.svg" />
                        </Button>
                    )}
                </form>
                <span>Já possui cadastro?</span>
                <Link to="/login">Fazer Login</Link>
            </Items>
        </Container>
    );
}
 
export default Register;