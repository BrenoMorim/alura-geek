import { expect, describe, it, vi } from "vitest";
import { mount } from '@vue/test-utils';
import ListaDeProdutos from '../../../components/Produtos/ListaDeProdutos.vue';
import store from '../../../store';

store.dispatch = vi.fn().mockImplementation(() => {});

describe('Na lista de produtos', () => {

    store.state.produtos = [
        {
            id: '20',
            nome: 'Produto Teste',
            urlImagem: 'www.imagemteste.com/imagemteste',
            descricao: 'Um produto de testes',
            categoria: 'Consoles',
            preco: 100
        },
        {
            id: '21',
            nome: 'Produto Teste 2',
            urlImagem: 'www.imagemteste.com/imagemteste',
            descricao: 'Um produto de testes 2',
            categoria: 'Consoles',
            preco: 120
        },
    ]

    const wrapper = mount(ListaDeProdutos, {
        props: {nomeDisplay: 'Testando Lista', categoria: 'Consoles'}
    });

    it('Deve conter os cards dos produtos renderizados', () => {

        const cards = wrapper.findAll('article.produto__card');
        expect(cards).toHaveLength(2);
        expect(cards[0].get('p.produto__nome').text()).toEqual('Produto Teste');
        expect(cards[1].get('p.produto__nome').text()).toEqual('Produto Teste 2');

    });

    it('Deve conter título customizado', () => {
        const titulo = wrapper.get('h3.produtos__titulo');
        expect(titulo.text()).toEqual('Testando Lista');
    });

    it('Deve conter link para ver produtos semelhantes', () => {
        const link = wrapper.get('.produtos__link');
        expect(link.attributes('to')).toEqual('/produtos?busca=Consoles');
        expect(link.text()).toContain('Ver tudo');
    });

});

describe('Quando a lista de produtos está vazia', () => {

    store.state.produtos = [];

    const wrapper = mount(ListaDeProdutos);

    it('Deve aparecer mensagem de erro', () => {
        
        const mensagemDeErro = wrapper.get('.mensagem-erro');
        expect(mensagemDeErro.text()).toEqual('Não foi possível encontrar nenhum produto =(');
    });
});
