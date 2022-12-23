import { useEffect, useState } from "react";
import { Box } from "./styles";
import img from "/src/assets/loading.svg";

interface LoadingInterface {
    status: boolean;
    button?: boolean;
}

export const Loading = ({status, button}: LoadingInterface) => {
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(status);
    }, [status]);

    return (
        <>
            {loading && (
                <Box button={button}>
                    <img src={img} alt="Loading..." />
                </Box>
            )}
        </>
    );
}
 
export default Loading;