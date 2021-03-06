import IProduto from '@/types/IProduto';
import IUsuario from '@/types/IUsuario';
import axios from 'axios';

const http = axios.create({
    baseURL: 'http://localhost:3000/',
    headers: {
        'Accept': 'application/json',
        'Content': 'application/json'
    }
});

export async function buscarProdutos() {
    const res = await http.get('/produtos');
    return res.data as IProduto[];
}

export async function buscarProdutoPorId(id: string) {
    const res = await http.get(`/produtos/${id}`);
    return res.data as IProduto;
}

export async function cadastrarProduto(produto: IProduto) {
    if (produto.id) {
        await http.put(`/produtos/${produto.id}`, produto);
    } else {
        await http.post('/produtos', produto);
    }
}

export async function deletarProduto(id: string) {
    await http.delete(`/produtos/${id}`);
}

export async function buscarUsuarioPorEmail(email: string) {
    const res = await http.get(`/usuarios/${email}`);
    return res.data as IUsuario;
}

export async function cadastrarUsuario(usuario: IUsuario) {
    try {
        await buscarUsuarioPorEmail(usuario.email);
        throw new Error("Já existe um usuário com esse email!");
    } catch(erro) {
        await http.post('/usuarios', usuario);
    }
}

export async function postarMensagem(mensagem: {nome: string, mensagem: string}) {
    await http.post('/mensagens', mensagem);
}