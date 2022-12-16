import axios from "axios";

import { useState, useEffect, FormEvent, BaseSyntheticEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

// Styles
import { Button, Container, Form } from "../../../styles/styles";

// Hooks
import useMessage from "../../../hooks/useMessage";
import useChangeInput from "../../../hooks/useChangeInput";

// Components
import InputAnimated from "../../../components/Layout/Form/Input";
import TextAreaAnimated from "../../../components/Layout/Form/TextArea";

interface DataFormInterface {
    nome: string;
    marca: string;
    serie: string;
    categoria: string;
    preco_unitario: string;
    quantidade_estoque: string;
    descricao: string;
}

const initialValue: DataFormInterface = {
    nome: "",
    marca: "",
    serie: "",
    categoria: "",
    preco_unitario: "",
    quantidade_estoque: "",
    descricao: "",
};

const InsertProducts = () => {
    const [loading, setLoading] = useState<boolean>(false);
    
    const [values, setValues] = useState(initialValue);

    const { dataForm, handleChange, setDataForm } = useChangeInput();
    const { msg, handleSetMessage } = useMessage();

    const navigate = useNavigate();

    const handleSubmit = (e: BaseSyntheticEvent) => {
        e.preventDefault();

        setLoading(true);

        const data = new FormData(e.target);

        const token_admin = localStorage.getItem("token_admin");

        axios.post("http://localhost:8080/api/admin/insertProducts", data, {
            headers: {
              Authorization: `Bearer ${token_admin}`
            }
        })
        .then(response => {
            setLoading(false);
            setDataForm(initialValue);
            handleSetMessage(response.data);
        })
        .catch(error => {
            setLoading(false);

            if(typeof error.response.data.authorization_admin !== 'undefined' && error.response.data.authorization_admin === false){
                localStorage.removeItem("token_admin");
                navigate("/admin/login", {state: {status: "error", message: "Faça login novamente!"}});
            }

            setDataForm(initialValue);
            handleSetMessage(error.response.data);
        });
    }

    useEffect(() => {
        if(dataForm){
            setValues({...values, ...dataForm});
        }
    }, [dataForm]);

    return ( 
        <Container displayFlex justifyContent="center" alignItems="center">
            <Form width="500px" onSubmit={handleSubmit}>
                <h1>Inserir Produtos</h1>
                {msg && msg}
                <InputAnimated 
                    type="text" 
                    name="nome"
                    label="Nome"
                    handleChange={handleChange}
                    value={values!.nome}
                />
                <InputAnimated 
                    type="text" 
                    name="marca"
                    label="Marca"
                    handleChange={handleChange} 
                    value={values!.marca}
                />
                <InputAnimated 
                    type="text" 
                    name="serie"
                    label="Série"
                    handleChange={handleChange} 
                    value={values!.serie}
                />
                <InputAnimated 
                    type="text" 
                    name="categoria"
                    label="Categoria"
                    handleChange={handleChange} 
                    value={values!.categoria}
                />
                <InputAnimated 
                    type="text" 
                    name="preco_unitario"
                    label="Preço Unitário"
                    handleChange={handleChange} 
                    value={values!.preco_unitario}
                />
                <InputAnimated 
                    type="number"  
                    name="quantidade_estoque"
                    label="Quantidade em Estoque"
                    handleChange={handleChange} 
                    value={values!.quantidade_estoque}
                />
                <InputAnimated 
                    type="file" 
                    name="imagem"
                    label="Imagem do Produto"
                    required={false}
                    handleChange={handleChange}
                />
                <TextAreaAnimated
                    name="descricao"
                    label="Descrição"
                    handleChange={handleChange} 
                    value={values!.descricao}
                />
                {!loading ? (
                    <Button width="100%" type="submit">
                        Inserir
                    </Button>
                ) : (
                    <Button width="100%" type="submit" disabled>
                        <img src="src/assets/loading.svg" />
                    </Button>
                )}
                <br />
                <Link to="/">Voltar para a Home</Link>
            </Form>
        </Container>
    );
}
 
export default InsertProducts;