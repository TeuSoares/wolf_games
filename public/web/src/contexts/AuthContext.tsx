import { useState, createContext, PropsWithChildren, useEffect} from "react"
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({
    isAuthenticated: false,
    handleChangeAuthentication: (status: boolean) => {},
    handleLogout: () => {}
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

    const handleLogout = () => {
        localStorage.setItem("auth", "false");
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        navigate("/");
    }

    return ( 
        <AuthContext.Provider value={{isAuthenticated, handleChangeAuthentication, handleLogout}}>
            {children}
        </AuthContext.Provider>
    );
}