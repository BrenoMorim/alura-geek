import { expect, describe, it, vi, beforeEach } from "vitest";
import { mount } from '@vue/test-utils';
import CarrinhoView from '../../views/CarrinhoView.vue';
import store from "../../store";
import IProduto from "../../types/IProduto";

describe('Na tela do Carrinho', () => {

    describe('Quando há itens no carrinho', () => {

        const produto1 = {
            id: '20',
            nome: 'Produto Teste',
            urlImagem: 'www.imagemteste.com/imagemteste',
            descricao: 'Um produto de testes',
            preco: 100
        } as IProduto;

        const produto2 = {
            id: '21',
            nome: 'Produto Teste 2',
            urlImagem: 'www.imagemteste.com/imagemteste',
            descricao: 'Um produto de testes 2',
            preco: 200
        } as IProduto;

        beforeEach(() => { 
            store.state.itensCarrinho = [
                {produto: produto1, quantidade: 2},
                {produto: produto2, quantidade: 1}
            ];
        });

        const wrapper = mount(CarrinhoView);
        
        it('Deve estar visível e ser renderizada corretamente', () => {
            expect(wrapper.isVisible()).toBeTruthy();
            expect(wrapper).toMatchSnapshot();
        });

        it('Deve conter título e lista com cada item', () => {
            const titulo = wrapper.get('.carrinho__titulo');
            expect(titulo.text()).toBe('Seu Carrinho');

            const listaItens = wrapper.findAll('.item');
            expect(listaItens).toHaveLength(2);

            expect(listaItens[0].get('.item__nome').text()).toBe(produto1.nome);
            expect(listaItens[1].get('.item__nome').text()).toBe(produto2.nome);
        });

        it('Deve calcular o valor total do pedido', () => {
            const valorTotal = wrapper.get('.carrinho__valor-total');
            expect(valorTotal.text()).toContain('400');
        });

        it('Deve conter botão de navegação para tela de produtos para adicionar mais itens ao carrinho', () => {
            const botaoNavegar = wrapper.get('#navegar');
            expect(botaoNavegar.text()).toBe('Adicionar mais produtos');
            expect(botaoNavegar.attributes('to')).toContain({name: 'produtos'});
        });

        it('Não deve deixar o pedido ser finalizado se o usuário não estiver logado, mostrando mensagem de erro', async () => {
            const botaoFinalizar = wrapper.get('#finalizar');
            await botaoFinalizar.trigger('click');

            const mensagemErro = wrapper.get('.mensagem-erro');
            expect(mensagemErro.text()).toContain('Você deve estar logado para poder finalizar o pedido');
        });

        it('Deve finalizar o pedido quando usuário estiver logado e em seguida esvaziar carrinho, mostrando mensagem de sucesso', async () => {
            
            store.state.usuarioLogado = {
                nome: 'Usuário Teste',
                email: 'usuario@teste.com',
                role: 'usuario',
                senha: ''
            };

            const mockFinalizarPedido = vi.fn().mockImplementation(() => {
                store.state.itensCarrinho = [];
            });

            store.dispatch = mockFinalizarPedido;

            const botaoFinalizar = wrapper.get('#finalizar');
            await botaoFinalizar.trigger('click');
            
            // Esperar função ser chamada e mensagem aparecer
            setTimeout(() => {
                expect(mockFinalizarPedido).toHaveBeenCalledOnce();
                
                const itens = wrapper.findAll('.item');
                expect(itens).toHaveLength(0);
                
                const mensagemSucesso = wrapper.get('.mensagem-sucesso');
                expect(mensagemSucesso.text()).toContain('O pedido foi feito com sucesso!');
            }, 200);
        });

    });

    describe('Quando o carrinho está vazio', () => {
        
        beforeEach(() => {
            store.state.itensCarrinho = [];
        });

        const wrapper = mount(CarrinhoView);

        it('Deve conter mensagem de erro', () => {
            const mensagem = wrapper.get('.carrinho__subtitulo');
            expect(mensagem.text()).toBe('Seu carrinho está vazio!');
        });

        it('Deve conter botão para navegar até a tela de buscar produtos', () => {
            const botaoNavegar = wrapper.get('#navegar');
            expect(botaoNavegar.text()).toBe('Que tal navegar entre nossa variedade de produtos?');
            expect(botaoNavegar.attributes('to')).toContain({name: 'produtos'});
        });

        it('Não deve conter botão para finalizar nem valor total', () => {
            const botaoFinalizar = wrapper.findAll('#finalizar');
            expect(botaoFinalizar).toHaveLength(0);

            const valorTotal = wrapper.findAll('.carrinho__valor-total');
            expect(valorTotal).toHaveLength(0);
        });
    });
});
