import { Link } from "react-router-dom";
import { Button } from "../../styles/Utils";
import { Card, ImageCard, Item } from "./styles";

interface ProductCardInterface {
    img: string;
    name: string;
    category: string;
    budge: number;
    brand: string;
    idProduct: number;
}

const ProductCard = ({img, name, category, budge, brand, idProduct}: ProductCardInterface) => {
    return ( 
        <Card>
            <ImageCard>
                <Link to={`/products/${brand}/${idProduct}`}>
                    <img src={`http://localhost:8080/uploads/${img}`} alt="" />
                </Link>
            </ImageCard>
            <Item>
                <Link to={`/products/${brand}/${idProduct}`}>
                    <h3>{name}</h3>
                </Link>
                <span className="category">{category}</span>
                <span className="budge">R$ {budge}</span>
                <Button type="button">Adicionar ao carrinho</Button>
            </Item>
        </Card>
    );
}
 
export default ProductCard;