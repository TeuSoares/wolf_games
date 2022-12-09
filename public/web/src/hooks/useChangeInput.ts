import { useState, ChangeEvent } from "react";

const useChangeInput = () => {
    const [ dataForm, setDataForm ] = useState<object>({});

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setDataForm({ ...dataForm!, [e.target.name]: e.target.value});
    };

    return {
        dataForm,
        handleChange
    }
}
 
export default useChangeInput;