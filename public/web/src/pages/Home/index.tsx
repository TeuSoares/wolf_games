import {useEffect, useState, useContext} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const Home = () => {
    const { handleChangeAuthentication } = useContext(AuthContext);

    const [data, setData] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        const authSession = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NzA2MDcwMzUsImVtYWlsIjoibWF0ZXVzc29hcmVzMTE0QGdtYWlsLmNvbSIsImlhdCI6MTY3MDUyMDYzNX0.OxwyMAFjoKX_W-LUgXv9tDJFOdDZ1R3EK5FMIt9XUDE";

        axios.get('http://localhost:8080/api/users/teste', {
            headers: {
                Authorization: authSession
            }
        })
        // axios.get('http://localhost:8080/api/users/teste')
        .then(({ data }) => {
            console.log(data);
        })
        .catch((error) => {
            console.log(error);
            if(error.response.data.authorization == false){
                handleChangeAuthentication(false);
            }
        })
    }, []); 

    return ( 
        <div>
            
        </div>  
    );
}
 
export default Home;