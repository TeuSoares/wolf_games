// Utils
import { useContext } from "react";

// Context
import { AddCarContext } from "../../contexts/AddCarContext";

// Hooks
import useMessage from "../../hooks/useMessage";

// Styles
import { Button } from "../../styles/Utils";

interface AddCarInterface {
    idProduct: number;
    className?: string;
}

const AddCart = ({idProduct, className}: AddCarInterface) => {
    const { handleChangeCar } = useContext(AddCarContext);

    const { msg, handleSetMessage } = useMessage();

    const handleAddCar = () => {
        const productsCar = [];

        const car = sessionStorage.getItem("car");

        const products = car ? JSON.parse(car) : [];

        const arrayIncludes = [];

        if(products.length > 0) {
            for(const product of products) {
                const values = Object.values(product);
                arrayIncludes.push(values[0]);
            }
        }

        if(!arrayIncludes.includes(idProduct)){
            const productsValues = products.values();

            for (const value of productsValues) {
                productsCar.push(value);
            }

            productsCar.push({
                idProduct: idProduct,
                qtd: 1
            });

            sessionStorage.setItem("car", JSON.stringify(productsCar));

            handleChangeCar();

            handleSetMessage({
                status: "success",
                message: "Produto adicionado ao carrinho!"
            }, true, true);
        }else{
            handleSetMessage({
                status: "error",
                message: "Produto já adicionado!"
            }, true, true);
        }
    }

    return (
        <>
            {msg ? msg : <Button className={className} type="button" onClick={handleAddCar}>Adicionar ao carrinho</Button>}
        </>
    );
}
 
export default AddCart;