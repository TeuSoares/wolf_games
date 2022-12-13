import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

interface ConfigInterface {
    method: string;
    url: string;
    data?: object;
    headers?: object;
}

const useQuery = () => {
    const { handleChangeAuthentication } = useContext(AuthContext);
    const navigate = useNavigate();

    return async (method: string, api: string, data?: object, route?: string) => {
        let config: ConfigInterface;
        let authorization;
    
        if(route === "protected"){
            const token = localStorage.getItem("token");
    
            authorization = {Authorization: `Bearer ${token}`}
        }
    
        if(method === "POST" || method === "PUT" || method === "PATCH") {
            config = {
                method,
                url: `http://localhost:8080/api/${api}`,
                data,
                headers: authorization ? authorization : {},
            }
        }else if(method === "DELETE" || method === "GET"){
            config = {
                method,
                url: `http://localhost:8080/api/${api}`,
                headers: authorization ? authorization : {},
            }
        }
    
        try {
            const response = await axios(config!);
    
            return {
                status: "success",
                data: response.data
            };
        } catch (error: any) {
            if(typeof error.response.data.authorization !== 'undefined' && error.response.data.authorization === false){
                handleChangeAuthentication(false);
                localStorage.removeItem("token");
                navigate("/login", {state: {status: "error", message: "Faça login novamente!"}});
            }

            return {
                status: "error",
                data: error.response.data
            };
        }
    };
}
 
export default useQuery;