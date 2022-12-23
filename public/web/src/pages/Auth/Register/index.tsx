import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Hooks
import useMessage from "../../../hooks/useMessage";
import useChangeInput from "../../../hooks/useChangeInput";
import useQuery from "../../../hooks/useQuery";

// Styles
import { 
    Container,
    Button,
    Form, 
} from "../../../styles/Utils";

// Components
import InputAnimated from "../../../components/Layout/Form/Input";
import Loading from "../../../components/Layout/Loading";

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
            handleSetMessage(data, true);

        }
    }

    return ( 
        <Container displayFlex justifyContent="center">
            <Form width="500px" onSubmit={handleSubmit}>
                <h1>Criar Conta</h1>
                {msg && msg}
                <InputAnimated 
                    type="text" 
                    name="nome" 
                    handleChange={handleChange} 
                    label="Nome"
                />
                <InputAnimated 
                    type="text" 
                    name="cpf" 
                    handleChange={handleChange} 
                    label="CPF"
                />
                <InputAnimated 
                    type="email" 
                    name="email" 
                    handleChange={handleChange} 
                    label="E-mail"
                />
                <InputAnimated 
                    type="text" 
                    name="celular" 
                    handleChange={handleChange} 
                    label="Celular"
                />
                <InputAnimated 
                    type="date" 
                    name="data_nascimento" 
                    handleChange={handleChange} 
                    label="Data de Nascimento"
                    required={false}
                />
                <InputAnimated 
                    type="password" 
                    name="senha" 
                    handleChange={handleChange} 
                    label="Senha"
                />
                {!loading ? (
                    <Button width="100%" type="submit">
                        Finalizar
                    </Button>
                ) : (
                    <Button width="100%" type="submit" disabled>
                        <Loading status button />
                    </Button>
                )}
                <span>Já possui cadastro?</span>
                <Link to="/login">Fazer Login</Link>
            </Form>
        </Container>
    );
}
 
export default Register;