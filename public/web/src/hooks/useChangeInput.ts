import { useState, ChangeEvent } from "react";

const useChangeInput = () => {
    const [ dataForm, setDataForm ] = useState<any>();

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setDataForm({ ...dataForm!, [e.target.name]: e.target.value});
    };

    return {
        dataForm,
        handleChange,
        setDataForm
    }
}
 
export default useChangeInput;