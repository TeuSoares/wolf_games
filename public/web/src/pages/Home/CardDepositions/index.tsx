import { BoxDeposition } from "./styles";
import { FaStar } from "react-icons/fa";
import { useEffect, useState } from "react";

interface DepositionInterface {
    name: string;
    date: string;
    comment: string;
    star: number;
}

const CardDeposition = ({name, date, comment, star}: DepositionInterface) => {
    const [renderStar, setRenderStar] = useState<Array<number>>([]);

    useEffect(() => {
        let arrStar = [];

        for(let i = 1; i <= star; i++){
            arrStar.push(i);
            setRenderStar(arrStar);
        }
    }, []);

    return ( 
        <BoxDeposition>
            <div>
                <span>{name}</span>
                <em>{date}</em>
            </div>
            <span>
                {renderStar?.map(item => (
                    <FaStar key={item} />
                ))}
            </span>
            <p>{comment}</p>
        </BoxDeposition>
    );
}
 
export default CardDeposition;