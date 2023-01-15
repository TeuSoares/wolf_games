// Utils
import { Link } from "react-router-dom";

// Hooks
import { useEffect, useState, FormEvent, useContext } from "react";
import useChangeInput from "../../hooks/useChangeInput";
import useMessage from "../../hooks/useMessage";
import useQuery from "../../hooks/useQuery";

// Contexts
import { AuthContext } from "../../contexts/AuthContext";

// Styles
import { Button, Form } from "../../styles/Utils";
import { ContainerProfile, Items, Key, ProfileHeader, Value } from "./styles";

// Components
import InputAnimated from "../../components/Layout/Form/Input";
import Loading from "../../components/Layout/Loading";

interface DataFormInterface {
    nome: string;
    cpf: string;
    celular: string;
    email: string;
    senha: string;
    data_nascimento: string;
}

const Profile = () => {
    const [values, setValues] = useState<DataFormInterface>();
    const [loading, setLoading] = useState<boolean>(false);
    const [formUpdate, setFormUpdate] = useState<boolean>(false);

    const { dataForm, handleChange, setDataForm } = useChangeInput();

    const handleQuery = useQuery();

    const { msg, handleSetMessage } = useMessage();

    const { handleLogout } = useContext(AuthContext);

    useEffect(() => {
        const fetchData = async () => {
            setDataForm(undefined);

            const { status, data } = await handleQuery("GET", "users/profile", {}, "protected");

            if(status === "success") {
                if(!formUpdate){
                    const celular = data[0].celular;
                    const cpf = data[0].cpf;
    
                    const newCelular = `(${celular.slice(0, 2)}) ${celular.slice(2, 7)}-${celular.slice(7, 11)}`;
                    const newsCpf = `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6, 9)}-${cpf.slice(9, 11)}`;

                    const date = new Date(data[0].data_nascimento);
                    const newsDate = date.toLocaleDateString("pt-BR", {timeZone: 'UTC'});
    
                    data[0].celular = newCelular;
                    data[0].cpf = newsCpf;
                    data[0].data_nascimento = newsDate;
                }

                setDataForm(data[0]);
                
            }else if(status === "error"){
                handleSetMessage(data, true);
            }
        }

        fetchData();
    }, [formUpdate]);

    useEffect(() => {
        setValues(dataForm);
    }, [dataForm]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoading(true);

        const { status, data } = await handleQuery("PUT", "users/profile/update", values, "protected");

        if(status === "success") {
            setLoading(false);
            handleSetMessage(data, true);
            setFormUpdate(false);
        }else if(status === "error"){
            setLoading(false);
            handleSetMessage(data, true);
        }
    }

    return ( 
        <ContainerProfile>
            <ProfileHeader>
                <h1>Meus dados</h1>
                <div>
                    {!formUpdate ? (
                        <Button type="button" onClick={() => setFormUpdate(true)}>
                            Editar
                        </Button>
                    ) : (
                        <Button type="button" background="#ce3434" backgroundHover="#9e3535" onClick={() => setFormUpdate(false)}>
                            Cancelar
                        </Button>
                    )}
                    <Link to="/profile/requests">
                        <Button type="button">
                            Pedidos
                        </Button>
                    </Link>
                    <Button type="button" onClick={handleLogout}>
                        Sair
                    </Button>
                </div>
            </ProfileHeader>
            {msg && msg}
            {msg || values ? <Loading status={false} /> : <Loading status={true} />}
            {!formUpdate ? (
                <>
                    {values && (
                        Object.entries(values).map((item, key) => (
                            <Items key={key}>
                                <Key>
                                    {item[0] == "data_nascimento" ? item[0] = "nascimento" : item[0]}
                                </Key>
                                <Value>
                                    {item[1]}
                                </Value>
                            </Items>
                        ))
                    )}
                </>
            ) : (
                <>
                    {values && (
                        <Form width="100%" onSubmit={handleSubmit}>
                            <InputAnimated 
                                type="text" 
                                name="nome" 
                                handleChange={handleChange} 
                                label="Nome Completo" 
                                value={values!.nome} 
                            />
                            <InputAnimated 
                                type="text" 
                                name="cpf"
                                handleChange={handleChange}
                                label="CPF"
                                value={values!.cpf} 
                            />
                            <InputAnimated 
                                type="email" 
                                name="email" 
                                handleChange={handleChange}
                                label="E-mail"
                                value={values!.email} 
                            />
                            <InputAnimated 
                                type="text" 
                                name="celular" 
                                handleChange={handleChange}
                                label="Celular"
                                value={values!.celular} 
                            />
                            <InputAnimated 
                                type="date" 
                                name="data_nascimento" 
                                handleChange={handleChange}
                                label="Data de Nascimento"
                                value={values!.data_nascimento}
                            />
                            <InputAnimated 
                                type="password" 
                                name="senha" 
                                handleChange={handleChange}
                                label="Senha"
                                placeholder="*****************"
                                required={false}
                            />
                            {!loading ? (
                                <Button width="100%" type="submit">
                                    Atualizar
                                </Button>
                            ) : (
                                <Button width="100%" type="button" disabled>
                                    <img src="src/assets/loading.svg" />
                                </Button>
                            )}
                        </Form>
                    )}
                </>
            )}
        </ContainerProfile>
    );
}
 
export default Profile;