import { useState, createContext, PropsWithChildren,useEffect} from "react"

export const AddCarContext = createContext({
    changeAddCar: false,
    handleChangeCar: () => {}
});

export const AddCarProvider = ({ children }: PropsWithChildren) => {
    const [changeAddCar, setChangeAddCar] = useState<boolean>(false);

    const handleChangeCar = () => {
        setChangeAddCar(!changeAddCar);
    }

    useEffect(() => {
        console.log(changeAddCar);
    }, []);

    return ( 
        <AddCarContext.Provider value={{changeAddCar, handleChangeCar}}>
            {children}
        </AddCarContext.Provider>
    );
}