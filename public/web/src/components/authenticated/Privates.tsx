import { Navigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";

interface PropsInterface {
    children: React.ReactNode
}

export const PrivateUserTrue = ({ children }: PropsInterface) => {
    const { isAuthenticated } = useContext(AuthContext);

    if(isAuthenticated){
        return (
            <>
                {children}
            </>
        );
    }else{
        return <Navigate to="/login" />
    }
    
}

export const PrivateUserFalse = ({ children }: PropsInterface) => {
    const { isAuthenticated } = useContext(AuthContext);

    if(!isAuthenticated){
        return (
            <>
                {children}
            </>
        );
    }else{
        return <Navigate to="/" />
    }
    
}