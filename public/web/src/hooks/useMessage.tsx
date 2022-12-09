import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { MessageInterface } from "../interfaces/MessageInterface";
import { Message } from "../styles/styles";

const useMessage = () => {
    const [msg, setMsg] = useState<JSX.Element | undefined>();
    const [element, setElement] = useState<JSX.Element | undefined>();

    const location = useLocation();

    const handleSetMessage = (msg: MessageInterface) => {
        setElement(<Message status={msg.status}>{msg.message}</Message>);
    }

    const clearMessage = () => {
        setTimeout(() => {
            setElement(undefined);
        }, 3000)
    };

    useEffect(() => {
        setMsg(element);
    }, [element]);

    useEffect(() => {
        if(location.state){
            if(location.state.message){
                setMsg(<Message status={location.state.status}>{location.state.message}</Message>);
    
                setTimeout(() => {
                    setMsg(undefined);
                }, 3000)
            }
        }
    }, [location.state]);

    return {
        msg,
        handleSetMessage,
        clearMessage
    }
}

export default useMessage;