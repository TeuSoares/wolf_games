import { BoxCard } from "./styles";

interface CardInterface {
    small: string;
    title: string;
    subTitle: string;
    img: string;
}

const CardNews = ({small, title, subTitle, img}: CardInterface) => {
    return ( 
        <BoxCard
            style={{
                backgroundImage: `url(http://127.0.0.1:5173/src/assets/novidades/${img})`
            }}
        >
            <div>
                <small>{small}</small>
                <h3>{title}</h3>
            </div>
            <h2>{subTitle}</h2>
            <a href="#">Saiba Mais</a>
        </BoxCard>
    );
}
 
export default CardNews;