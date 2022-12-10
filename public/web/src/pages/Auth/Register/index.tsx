import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Hooks
import useMessage from "../../../hooks/useMessage";
import useChangeInput from "../../../hooks/useChangeInput";
import useQuery from "../../../hooks/useQuery";

// Styles
import { 
    Container, 
    AnimationInputText, 
    Button, 
} from "../../../styles/styles";
import { Items } from "../styles";

interface DataFormInterface {
    nome: string;
    cpf: string;
    celular: string;
    email: string;
    senha: string;
    data_nascimento: string;
}

const Register = () => {
    const [loading, setLoading] = useState<boolean>(false);

    const { dataForm, handleChange } = useChangeInput();
    const { msg, handleSetMessage } = useMessage();

    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoading(true);

        const values: DataFormInterface | object = dataForm;

        const { status, data } = await useQuery("POST", "users/register", values);

        if(status === "success") {

            navigate("/login", {state: data});

        }else if(status === "error"){

            setLoading(false);
            handleSetMessage(data);

        }
    }

    return ( 
        <Container displayFlex justifyContent="center">
            <Items>
                <h1>Criar Conta</h1>
                {msg && msg}
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