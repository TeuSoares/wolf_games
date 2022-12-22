import { Link } from "react-router-dom";
import { Container } from "../../styles/Utils";
import { Box } from "./styles";
import { FaSkull } from "react-icons/fa"

const NotFound = () => {
    return (
        <Container displayFlex justifyContent="center">
            <Box>
                <FaSkull />
                <h1>Página não encontrada (404)</h1>
                <p>
                    Ops! Parece que você está tentando acessar uma página que não existe.
                    Confira se digitou a url corretamente ou volte para a página inicial.
                </p>
                <Link to="/">Voltar para a Home</Link>
            </Box>
        </Container>
    );
}
 
export default NotFound;