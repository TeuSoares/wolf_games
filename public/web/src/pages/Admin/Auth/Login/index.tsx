import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Hooks
import useChangeInput from "../../../../hooks/useChangeInput";
import useMessage from "../../../../hooks/useMessage";
import useQuery from "../../../../hooks/useQuery";

// Styles
import { Button, Container, Form } from "../../../../styles/Utils";

// Components
import InputAnimated from "../../../../components/Layout/Form/Input";
import Loading from "../../../../components/Layout/Loading";

const LoginAdmin = () => {
    const [loading, setLoading] = useState<boolean>(false);

    const { dataForm, handleChange } = useChangeInput();
    const { msg, handleSetMessage } = useMessage();

    const handleQuery = useQuery();

    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoading(true);

        const { status, data } = await handleQuery("POST", "admin/login", dataForm);
        
        if(status === "success") {
            localStorage.setItem("token_admin", data.token_admin);
            navigate("/admin/insertProducts");
        }else if(status === "error"){
            setLoading(false);
            handleSetMessage(data, true);
        }
    }

    return ( 
        <Container displayFlex justifyContent="center" alignItems="center">
            <Form width="500px" onSubmit={handleSubmit}>
                <h1>Bem-Vindo!</h1>
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
                <InputAnimated 
                    type="text" 
                    name="key_admin" 
                    handleChange={handleChange} 
                    label="Chave Secreta"
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
                <span>Novo na equipe?</span>
                <Link to="/admin/register">Cadastre-se</Link>
            </Form>
        </Container>
    );
}
 
export default LoginAdmin;