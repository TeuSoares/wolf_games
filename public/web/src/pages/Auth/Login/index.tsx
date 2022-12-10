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
    const { msg, handleSetMessage } = useMessage();

    const navigate = useNavigate();

    const { handleChangeAuthentication } = useContext(AuthContext);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoading(true);

        const values: DataFormInterface | object = dataForm;

        const { status, data } = await useQuery("POST", "users/login", values);
        
        if(status === "success") {

            handleChangeAuthentication(true);
            localStorage.setItem("token", data.token);
            navigate("/");
            
        }else if(status === "error"){

            setLoading(false);
            handleSetMessage(data);

            if(data.message == "Validação"){
                navigate(`/verifyEmail/${data.values}`, {state: {redirect: "login", status: "success", message: "Insira o código que foi enviado para seu e-mail"}});
            }

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