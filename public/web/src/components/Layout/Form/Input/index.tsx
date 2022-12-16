import { ChangeEvent } from "react";
import { AnimationInputText } from "../styles";

interface InputAnimatedInterface {
    type: string;
    name: string;
    value?: string;
    label: string;
    width?: string;
    required?: boolean;
    placeholder?: string;
    handleChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const InputAnimated = ({type, name, handleChange, value, label, width, required = true, placeholder}: InputAnimatedInterface) => {
    return ( 
        <AnimationInputText width={width}>
            {required ? (
                <input 
                    type={type} 
                    name={name}  
                    onChange={handleChange}
                    value={value}
                    placeholder={placeholder}
                    required
                />
            ) : (
                <input 
                    type={type} 
                    name={name}  
                    onChange={handleChange}
                    value={value}
                    placeholder={placeholder}
                />
            )}
            <label htmlFor={name}>{label}</label>
        </AnimationInputText>
    );
}
 
export default InputAnimated;