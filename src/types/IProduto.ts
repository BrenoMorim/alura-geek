import Categorias from "./Categorias";

export default interface IProduto {
    id: string,
    nome: string,
    descricao: string,
    urlImagem: string,
    preco: number,
    categoria: Categorias
}