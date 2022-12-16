import { ChangeEvent } from "react";
import { AnimationInputText } from "../styles";

interface TextAreaAnimatedInterface {
    name: string;
    value?: string;
    label: string;
    width?: string;
    required?: boolean;
    placeholder?: string;
    handleChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextAreaAnimated = ({name, handleChange, value, label, width, required = true, placeholder}: TextAreaAnimatedInterface) => {
    return ( 
        <AnimationInputText width={width}>
            {required ? (
                <textarea
                    name={name}  
                    onChange={handleChange}
                    value={value}
                    placeholder={placeholder}
                    required
                    rows={10}
                />
            ) : (
                <textarea
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
 
export default TextAreaAnimated;