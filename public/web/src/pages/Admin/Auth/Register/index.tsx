import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Hooks
import useChangeInput from "../../../../hooks/useChangeInput";
import useQuery from "../../../../hooks/useQuery";
import useMessage from "../../../../hooks/useMessage";

// Styles
import { Button, Container, Form } from "../../../../styles/Utils";

// Components
import InputAnimated from "../../../../components/Layout/Form/Input";
import Loading from "../../../../components/Layout/Loading";

const RegisterAdmin = () => {
    const [loading, setLoading] = useState<boolean>(false);

    const { dataForm, handleChange } = useChangeInput();
    const { msg, handleSetMessage } = useMessage();

    const handleQuery = useQuery();

    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoading(true);

        const { status, data } = await handleQuery("POST", "admin/register", dataForm);

        if(status === "success"){
            navigate("/admin/login", {state: data});
        }else if(status === "error"){
            setLoading(false);
            handleSetMessage(data, true);
        }
    }

    return ( 
        <Container displayFlex justifyContent="center" alignItems="center">
            <Form width="500px" onSubmit={handleSubmit}>
                <h1>Cadastrar Administrador</h1>
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
                        Finalizar
                    </Button>
                ) : (
                    <Button width="100%" type="submit" disabled>
                        <Loading status button />
                    </Button>
                )}
                <span>Já possui login?</span>
                <Link to="/admin/login">Entrar</Link>
            </Form>
        </Container>
    );
}
 
export default RegisterAdmin;