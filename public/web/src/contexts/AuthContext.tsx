import { useState, createContext, PropsWithChildren, useEffect} from "react"
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({
    isAuthenticated: false,
    handleChangeAuthentication: (status: boolean) => {},
    logout: () => {}
});

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('auth');

        if(auth == "true"){
            setIsAuthenticated(true);
        }else{
            setIsAuthenticated(false);
        }
    }, []);
    
    const handleChangeAuthentication = (status: boolean) => {
        if(status == true){
            localStorage.setItem("auth", "true");
            setIsAuthenticated(true);
        }else if(status == false){
            localStorage.setItem("auth", "false");
            setIsAuthenticated(false);
            navigate("/login", {state: {status: "error", message: "Faça login novamente!"}});
        }
    }

    const logout = () => {
        localStorage.setItem("auth", "false");
        setIsAuthenticated(false);
    }

    return ( 
        <AuthContext.Provider value={{isAuthenticated, handleChangeAuthentication, logout}}>
            {children}
        </AuthContext.Provider>
    );
}