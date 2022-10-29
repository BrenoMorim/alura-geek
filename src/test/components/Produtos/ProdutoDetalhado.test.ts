import { expect, describe, it, vi } from "vitest";
import { mount } from '@vue/test-utils';
import ProdutoDetalhado from '../../../components/Produtos/ProdutoDetalhado.vue';
import store from "../../../store";

const mockExcluirProduto = vi.fn().mockImplementation(()  => {
    throw new Error();
}); 

store.dispatch = mockExcluirProduto; 

const produto = {
    id: '20',
    nome: 'Produto Teste',
    urlImagem: 'www.imagemteste.com/imagemteste',
    descricao: 'Um produto de testes',
    categoria: 'Consoles',
    preco: 100
};

describe('No produto detalhado', () => {

    const wrapper = mount(ProdutoDetalhado, {
        props: produto
    });

    it('Deve conter as informações do produto em detalhes', () => {
        expect(wrapper.get('.produto__nome').text()).toEqual(produto.nome);
        expect(wrapper.get('.produto__descricao').text()).toEqual(produto.descricao);
        expect(wrapper.get('.produto__preco').text()).toEqual('Preço: R$ 100,00');

        const imagemProduto = wrapper.get('img.produto__imagem');
        expect(imagemProduto.attributes('src')).toEqual(produto.urlImagem);
        expect(imagemProduto.attributes('alt')).toEqual(produto.nome);
    });

});

describe('Quando o usuário logado é administrador', () => {

    store.state.usuarioLogado = {
        nome: 'Admin teste',
        email: 'admin@teste.com',
        senha: '',
        role: 'admin'
    };

    const wrapper = mount(ProdutoDetalhado, {
        props: produto
    });
    
    it('Deve conter botões para editar e excluir produto', async () => {

        const botaoEditar = wrapper.get('.botao--editar');
        expect(botaoEditar.attributes('to')).toBe(`/produtos/editar/${produto.id}`);
        expect(botaoEditar.text()).toBe('Editar Produto');

        const botaoExcluir = wrapper.get('.botao--excluir');
        expect(botaoExcluir.text()).toBe('Excluir Produto');

        await botaoExcluir.trigger('click');
    
        const mensagemErro = wrapper.get('.mensagem-erro');

        expect(mensagemErro.text()).toBe('Não foi possível excluir o produto');
        expect(mockExcluirProduto).toHaveBeenCalledOnce();
    });

});
