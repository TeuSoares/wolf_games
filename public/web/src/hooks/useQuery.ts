import axios from "axios";

interface ConfigInterface {
    method: string;
    url: string;
    data?: object;
    headers?: object;
}

const useQuery = () => {
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
            return {
                status: "error",
                data: error.response.data
            };
        }
    }
}
 
export default useQuery;