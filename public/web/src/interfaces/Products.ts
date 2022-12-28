export interface DataProductsInterface {
    id_produto: number;
    preco_unitario: string;
    imagem: string;
    nome: string;
    categoria: string;
    marca: string;
    quantidade_estoque?: number;
}