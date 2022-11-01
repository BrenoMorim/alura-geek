import { expect, describe, it } from "vitest";
import { mount } from '@vue/test-utils';
import CardProduto from '../../../components/Produtos/CardProduto.vue';

describe('No card de produto', () => {

    const produto = {
        id: '20',
        nome: 'Produto Teste',
        urlImagem: 'www.imagemteste.com/imagemteste',
        descricao: 'Um produto de testes',
        preco: 100
    };

    const card = mount(CardProduto, {
        props: produto
    });

    it('Deve conter as informações do produto', () => {

        expect(card.get('.produto__nome').text()).toEqual(produto.nome);
        expect(card.get('.produto__preco').text()).toEqual('R$ 100,00');

    });

    it('Deve conter imagem do produto, com atributos alt e src', () => {

        const imagemProduto = card.get('img.produto__imagem');
        expect(imagemProduto.attributes('src')).toEqual(produto.urlImagem);
        expect(imagemProduto.attributes('alt')).toEqual(produto.nome);

    });

    it('Deve conter link para o produto detalhado', () => {

        const link = card.get('.produto__link');
        expect(link.text()).toEqual('Ver produto');
        expect(link.attributes('to')).toEqual(`/produtos/${produto.id}`);

    });

});