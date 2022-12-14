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
    Form, 
} from "../../../styles/styles";

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

    const handleQuery = useQuery();

    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoading(true);

        const values: DataFormInterface = dataForm;

        const { status, data } = await handleQuery("POST", "users/register", values);

        if(status === "success") {

            navigate("/login", {state: data});

        }else if(status === "error"){

            setLoading(false);
            handleSetMessage(data);

        }
    }

    return ( 
        <Container displayFlex justifyContent="center">
            <Form width="500px" onSubmit={handleSubmit}>
                <h1>Criar Conta</h1>
                {msg && msg}
                <AnimationInputText>
                    <input type="text" name="nome" required onChange={handleChange} />
                    <label htmlFor="nome">Nome Completo</label>
                </AnimationInputText>
                <AnimationInputText>
                    <input type="text" name="cpf" required onChange={handleChange} />
                    <label htmlFor="cpf">CPF</label>
                </AnimationInputText>
                <AnimationInputText>
                    <input type="email" name="email" required onChange={handleChange} />
                    <label htmlFor="email">E-mail</label>
                </AnimationInputText>
                <AnimationInputText>
                    <input type="text" name="celular" required onChange={handleChange} />
                    <label htmlFor="celular">Celular</label>
                </AnimationInputText>
                <AnimationInputText>
                    <input type="date" name="data_nascimento" onChange={handleChange} />
                    <label htmlFor="data_nascimento">Data de Nascimento</label>
                </AnimationInputText>
                <AnimationInputText>
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
                <span>Já possui cadastro?</span>
                <Link to="/login">Fazer Login</Link>
            </Form>
        </Container>
    );
}
 
export default Register;