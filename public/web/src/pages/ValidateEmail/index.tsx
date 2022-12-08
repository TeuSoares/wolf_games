import axios from "axios";
import { useState, FormEvent, ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, AnimationInputText, Button, Message } from "../../styles/styles";
import { Items } from "./styles";

interface DataFormInterface {
    email: string;
    senha: string;
}

interface ResponseInterface {
    status: string;
    message: string;
}

const ValidateEmail = () => {
    const [dataForm, setData] = useState<Array<DataFormInterface>>();
    const [response, setResponse] = useState<ResponseInterface | "">("");
    const [loading, setLoading] = useState<boolean>(false);

    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoading(true);

        const id = localStorage.getItem("id");

        try {
            const { data } = await axios.post(`http://localhost:8080/api/users/verificationEmail/${id}`, dataForm);

            localStorage.removeItem("id");
            
            navigate("/login", {state: data});
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
            <h1>Verifique seu E-mail</h1>
            {response && <Message status={response.status}>{response.message}</Message>}
            <form onSubmit={handleSubmit}>
                <AnimationInputText 
                    width="100%" 
                    color="#fff" 
                    inputBorder="#fff" 
                    backgroundLabel="#161618"
                >
                    <input type="text" name="codeInput" required onChange={handleChange} />
                    <label htmlFor="verifyEmail">Código</label>
                </AnimationInputText>
                {!loading ? (
                        <Button width="100%" type="submit">
                            Validar
                        </Button>
                    ) : (
                        <Button width="100%" type="submit" disabled>
                            <img src="src/assets/loading.svg" />
                        </Button>
                    )}
            </form>
            <span>Já verificou?</span>
            <Link to="/login">Fazer Login</Link>
        </Items>
    </Container>
    );
}
 
export default ValidateEmail;