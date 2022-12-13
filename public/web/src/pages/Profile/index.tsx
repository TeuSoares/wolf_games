import { useEffect, useState } from "react";
import useMessage from "../../hooks/useMessage";
import useQuery from "../../hooks/useQuery";

import { Button } from "../../styles/styles";
import { ContainerProfile, Items, Key, ProfileHeader, Value } from "./styles";

const Profile = () => {
    const [dataQuery, setDataQuery] = useState<Array<object>>();
    const [loading, setLoading] = useState<boolean>(false);

    const handleQuery = useQuery();

    const { msg, handleSetMessage } = useMessage();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            const { status, data } = await handleQuery("GET", "users/profile", {}, "protected");

            if(status === "success") {
                setLoading(false);

                const celular = data[0].celular;
                const cpf = data[0].cpf;

                const newCelular = `(${celular.slice(0, 2)}) ${celular.slice(2, 7)}-${celular.slice(7, 11)}`;
                const newsCpf = `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6, 9)}-${cpf.slice(9, 11)}`;

                data[0].celular = newCelular;
                data[0].cpf = newsCpf;

               setDataQuery(data);
                
            }else if(status === "error"){
                setLoading(false);
                handleSetMessage(data);
            }
        }

        fetchData();
    }, []);

    return ( 
        <ContainerProfile>
            <ProfileHeader>
                <h1>Meus dados</h1>
                <a href="#">
                    <Button type="button">Editar</Button>
                </a>
            </ProfileHeader>
            {msg && msg}
            {loading && <img src="src/assets/loading.svg" />}
            {dataQuery && (
                dataQuery.map(data => (
                    Object.entries(data).map((item, key) => (
                        <Items key={key}>
                            <Key>
                                {item[0]}
                            </Key>
                            <Value>
                                {item[1]}
                            </Value>
                        </Items>
                    ))
                ))
            )}
        </ContainerProfile>
    );
}
 
export default Profile;