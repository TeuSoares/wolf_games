import { useState, FormEvent, useEffect } from "react";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";

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
    codeInput: string;
}

const ValidateEmail = () => {
    const [loading, setLoading] = useState<boolean>(false);

    const { dataForm, handleChange } = useChangeInput();
    const { msg, handleSetMessage } = useMessage();

    const handleQuery = useQuery();

    const { id } = useParams();

    const navigate = useNavigate();

    const location = useLocation();

    useEffect(() => {
        if(!location.state || location.state.redirect != "login"){
            navigate("/login", {state: {status: "error", message: "Faça seu login antes!"}});
        }
    }, []);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoading(true);

        const values: DataFormInterface = dataForm;

        const { status, data } = await handleQuery("POST", `users/verificationEmail/${id}`, values);

        if(status === "success") {

            navigate("/login", {state: data});

        }else if(status === "error"){

            setLoading(false);
            handleSetMessage(data);

        }
    }

    return ( 
        <Container displayFlex justifyContent="center" alignItems="center">
            <Form width="500px" onSubmit={handleSubmit}>
                <h1>Verifique seu E-mail</h1>
                {msg && msg}
                <AnimationInputText>
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
                <span>Já verificou?</span>
                <Link to="/login">Fazer Login</Link>
            </Form>
    </Container>
    );
}
 
export default ValidateEmail;