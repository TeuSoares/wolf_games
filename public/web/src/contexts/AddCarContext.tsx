import { useState, createContext, PropsWithChildren} from "react"

export const AddCarContext = createContext({
    changeAddCar: false,
    handleChangeCar: () => {}
});

export const AddCarProvider = ({ children }: PropsWithChildren) => {
    const [changeAddCar, setChangeAddCar] = useState<boolean>(false);

    const handleChangeCar = () => {
        setChangeAddCar(!changeAddCar);
    }

    return ( 
        <AddCarContext.Provider value={{changeAddCar, handleChangeCar}}>
            {children}
        </AddCarContext.Provider>
    );
}