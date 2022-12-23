import { Link, useNavigate, } from "react-router-dom";

import { 
    useState, 
    FormEvent, 
    useContext 
} from "react";

// Hooks
import useMessage from "../../../hooks/useMessage";
import useChangeInput from "../../../hooks/useChangeInput";
import useQuery from "../../../hooks/useQuery";

// Contexts
import { AuthContext } from "../../../contexts/AuthContext";

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
    email: string;
    senha: string;
}

const Login = () => {
    const [loading, setLoading] = useState<boolean>(false);

    const { dataForm, handleChange } = useChangeInput();
    const { msg, handleSetMessage } = useMessage();

    const handleQuery = useQuery();

    const navigate = useNavigate();

    const { handleChangeAuthentication } = useContext(AuthContext);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoading(true);

        const values: DataFormInterface = dataForm;

        const { status, data } = await handleQuery("POST", "users/login", values);
        
        if(status === "success") {

            handleChangeAuthentication(true);
            localStorage.setItem("token", data.token);
            navigate("/");
            
        }else if(status === "error"){

            setLoading(false);
            handleSetMessage(data, true);

            if(data.message == "Validação"){
                navigate(`/verifyEmail/${data.values}`, {state: {redirect: "login", status: "success", message: "Insira o código que foi enviado para seu e-mail"}});
            }

        }
    }

    return ( 
        <Container displayFlex justifyContent="center" alignItems="center">
            <Form width="500px" onSubmit={handleSubmit}>
                <h1>Fazer Login</h1>
                {msg && msg}
                <InputAnimated 
                    type="email" 
                    name="email" 
                    handleChange={handleChange} 
                    label="E-mail"
                />
                <InputAnimated 
                    type="password" 
                    name="senha"  
                    handleChange={handleChange} 
                    label="Senha"
                />
                {!loading ? (
                    <Button width="100%" type="submit">
                        Entrar
                    </Button>
                ) : (
                    <Button width="100%" type="submit" disabled>
                        <Loading status button />
                    </Button>
                )}
                <span>Novo na Wolf Games?</span>
                <Link to="/register">Cadastre-se</Link>
            </Form>
        </Container>
    );
}
 
export default Login;