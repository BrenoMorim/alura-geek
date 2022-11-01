export default interface IPedido {
    emailUsuario: string,
    itens: {
        quantidade: number,
        produtoId: string
    }[],
    valorTotal: number
}
