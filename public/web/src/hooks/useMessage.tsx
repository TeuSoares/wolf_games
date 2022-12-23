import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { MessageInterface } from "../interfaces/MessageInterface";
import { Message } from "../styles/Utils";

const useMessage = () => {
    const [msg, setMsg] = useState<JSX.Element | undefined>();

    const location = useLocation();

    const handleSetMessage = (msg: MessageInterface, clear: boolean) => {
        setMsg(<Message status={msg.status}>{msg.message}</Message>);

        if(clear){
            setTimeout(() => {
                setMsg(undefined);
            }, 3000)
        }
    }

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
        handleSetMessage
    }
}

export default useMessage;