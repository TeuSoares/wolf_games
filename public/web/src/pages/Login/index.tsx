import axios from "axios";
import { useEffect, useState, FormEvent, ChangeEvent, useContext } from "react";
import { Link, useLocation, useNavigate, } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { Container, AnimationInputText, Button, Message } from "../../styles/styles";
import { Items } from "./styles";

interface LocationStateInterface {
    status: string;
    message: string;
}

interface DataFormInterface {
    email: string;
    senha: string;
}

interface ResponseInterface {
    status: string;
    message: string;
}

const Login = () => {
    const [dataForm, setData] = useState<Array<DataFormInterface>>();
    const [response, setResponse] = useState<ResponseInterface | "">("");
    const [loading, setLoading] = useState<boolean>(false);

    const location = useLocation();
    const [stateLocation, setStateLocation] = useState<LocationStateInterface | null>();

    const { handleChangeAuthentication } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoading(true);

        try {
            await axios.post('http://localhost:8080/api/users/login', dataForm);

            handleChangeAuthentication(true);
            
            navigate("/");
        } catch (error: any) {
            setLoading(false);

            setResponse(error.response.data);

            if(error.response.data.message == "Validação"){
                navigate("/verifyEmail");
            }

            setTimeout(() => {
                setResponse("");
            }, 5000);
        }
    }

    useEffect(() => {
        if(location.state){
            setStateLocation(location.state);

            setTimeout(() => {
                setStateLocation(null);
            }, 5000)
        }
    }, []);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => setData({ ...dataForm!, [e.target.name]: e.target.value});

    return ( 
        <Container displayFlex justifyContent="center" alignItems="center">
            <Items>
                <h1>Fazer Login</h1>
                {stateLocation && <Message status={stateLocation.status}>{stateLocation.message}</Message>}
                {response && <Message status={response.status}>{response.message}</Message>}
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