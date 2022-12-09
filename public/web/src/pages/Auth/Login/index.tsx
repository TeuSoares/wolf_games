import axios from "axios";
import { Link, useNavigate, } from "react-router-dom";

import { 
    useState, 
    FormEvent, 
    useContext 
} from "react";

// Hooks
import useMessage from "../../../hooks/useMessage";
import useChangeInput from "../../../hooks/useChangeInput";

// Contexts
import { AuthContext } from "../../../contexts/AuthContext";

// Styles
import { 
    Container, 
    AnimationInputText, 
    Button, 
} from "../../../styles/styles";
import { Items } from "../styles";

interface DataFormInterface {
    email: string;
    senha: string;
}

const Login = () => {
    const [loading, setLoading] = useState<boolean>(false);

    const { dataForm, handleChange } = useChangeInput();
    const { msg, handleSetMessage, clearMessage } = useMessage();

    const navigate = useNavigate();

    const { handleChangeAuthentication } = useContext(AuthContext);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoading(true);

        const values: DataFormInterface | object = dataForm;

        try {
            await axios.post('http://localhost:8080/api/users/login', values);

            handleChangeAuthentication(true);
            
            navigate("/");
        } catch (error: any) {
            setLoading(false);

            handleSetMessage(error.response.data);

            if(error.response.data.message == "Validação"){
                navigate("/verifyEmail");
            }

            clearMessage();
        }
    }

    return ( 
        <Container displayFlex justifyContent="center" alignItems="center">
            <Items>
                <h1>Fazer Login</h1>
                {msg && msg}
                <form onSubmit={handleSubmit}>
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
                        <input type="password" name="senha" required onChange={handleChange} />
                        <label htmlFor="senha">Senha</label>
                    </AnimationInputText>
                    {!loading ? (
                        <Button width="100%" type="submit">
                            Entrar
                        </Button>
                    ) : (
                        <Button width="100%" type="submit" disabled>
                            <img src="src/assets/loading.svg" />
                        </Button>
                    )}
                </form>
                <span>Novo na Wolf Games?</span>
                <Link to="/register">Cadastre-se</Link>
            </Items>
        </Container>
    );
}
 
export default Login;