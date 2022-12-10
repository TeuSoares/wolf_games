import axios from "axios";
import { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

// Hooks
import useMessage from "../../../hooks/useMessage";
import useChangeInput from "../../../hooks/useChangeInput";

// Styles
import { 
    Container, 
    AnimationInputText, 
    Button,
} from "../../../styles/styles";
import { Items } from "../styles";

interface DataFormInterface {
    codeInput: string;
}

const ValidateEmail = () => {
    const [loading, setLoading] = useState<boolean>(false);

    const { dataForm, handleChange } = useChangeInput();
    const { msg, handleSetMessage } = useMessage();

    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoading(true);

        const id = localStorage.getItem("id");

        const values: DataFormInterface | object = dataForm;

        try {
            const { data } = await axios.post(`http://localhost:8080/api/users/verificationEmail/${id}`, values);

            localStorage.removeItem("id");
            
            navigate("/login", {state: data});
        } catch (error: any) {
            setLoading(false);

            handleSetMessage(error.response.data);
        }
    }

    return ( 
        <Container displayFlex justifyContent="center" alignItems="center">
        <Items>
            <h1>Verifique seu E-mail</h1>
            {msg && msg}
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