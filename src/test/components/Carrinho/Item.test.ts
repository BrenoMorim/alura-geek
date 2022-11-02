import { expect, describe, it, vi, afterEach } from "vitest";
import { mount } from '@vue/test-utils';
import Item from '../../../components/Carrinho/Item.vue';
import store from "../../../store";
import IProduto from "../../../types/IProduto";

describe('No card de item', () => {
    const produto = {
        id: '20',
        nome: 'Produto Teste',
        urlImagem: 'www.imagemteste.com/imagemteste',
        descricao: 'Um produto de testes',
        preco: 100
    } as IProduto;
    const quantidade = 1;
    const wrapper = mount(Item, {
        props: {
            produto,
            quantidade
        }
    });

    afterEach(() => {
        vi.clearAllMocks();
        vi.resetAllMocks();
        vi.restoreAllMocks();
    });

    it('Deve conter os dados do produto', () => {
        const nomeProduto = wrapper.get('.item__nome');
        expect(nomeProduto.text()).toBe(produto.nome);

        const imagemProduto = wrapper.get('.item__imagem-produto');
        expect(imagemProduto.attributes('src')).toBe(produto.urlImagem);
        expect(imagemProduto.attributes('alt')).toBe(`Imagem de ${produto.nome}`);

        const precoProduto = wrapper.get('.item__preco');
        expect(precoProduto.text()).toContain(produto.preco);
    });

    it('Deve conter botão de remover produto', async () => {
        const botaoRemover = wrapper.get('.item__remover');
        expect(botaoRemover.text()).toBe('Remover');
        
        const removerItem = vi.fn().mockImplementation(() => {});
        store.dispatch = removerItem;

        await botaoRemover.trigger('click');
        expect(removerItem).toHaveBeenCalledOnce();
    });

    it('Deve conter quantidade que pode ser aumentada ou diminuída', async () => {
        const quantidadeItem = wrapper.get('.item__quantidade');
        expect(quantidadeItem.text()).toEqual('1');

        const aumentar = vi.fn().mockImplementation(() => {
            wrapper.setProps({quantidade: 1 + 1});
        });

        store.dispatch = aumentar;
        const botaoAumentar = wrapper.get('#adicionar');
        await botaoAumentar.trigger('click');

        expect(aumentar).toHaveBeenCalledOnce();
        expect(quantidadeItem.text()).toEqual('2')

        const diminuir = vi.fn().mockImplementation(() => {
            wrapper.setProps({quantidade: 2 - 1});
        });

        store.dispatch = diminuir;
        const botaoDiminuir = wrapper.get('#diminuir');
        await botaoDiminuir.trigger('click');

        expect(diminuir).toHaveBeenCalledOnce();
        expect(quantidadeItem.text()).toBe('1');
    });

    it('A quantidade deve ser no mímino 1 e no máximo 10', async () => {
        
        const alterarQuantidade = vi.fn().mockImplementation(() => {});
        store.dispatch = alterarQuantidade;
        
        await wrapper.setProps({quantidade: 1});
        const botaoDiminuir = wrapper.get('#diminuir');
        await botaoDiminuir.trigger('click');
        expect(alterarQuantidade).not.toHaveBeenCalled();
        
        await wrapper.setProps({quantidade: 10});
        const botaoAumentar = wrapper.get('#adicionar');
        await botaoAumentar.trigger('click');
        expect(alterarQuantidade).not.toHaveBeenCalled();
    });

});
