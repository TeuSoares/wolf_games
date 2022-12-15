import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";

// Hooks
import useChangeInput from "../../../../hooks/useChangeInput";

// Styles
import { Button, Container, Form } from "../../../../styles/styles";

// Components
import InputAnimated from "../../../../components/Layout/Input";

const RegisterAdmin = () => {
    const [loading, setLoading] = useState<boolean>(false);

    const { dataForm, handleChange } = useChangeInput();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    return ( 
        <Container displayFlex justifyContent="center" alignItems="center">
            <Form width="500px" onSubmit={handleSubmit}>
                <h1>Cadastrar Administrador</h1>
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
                        Finalizar
                    </Button>
                ) : (
                    <Button width="100%" type="submit" disabled>
                        <img src="src/assets/loading.svg" />
                    </Button>
                )}
                <span>Já possui login?</span>
                <Link to="/admin/login">Entrar</Link>
            </Form>
        </Container>
    );
}
 
export default RegisterAdmin;