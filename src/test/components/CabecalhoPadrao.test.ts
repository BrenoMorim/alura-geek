import { expect, describe, it, beforeEach } from "vitest";
import { mount } from '@vue/test-utils';
import CabecalhoPadrao from '../../components/CabecalhoPadrao.vue';
import store from "../../store";

describe('No cabeçalho padrão', () => {

    describe('Quando o usuário não está logado', () => {

        const wrapper = mount(CabecalhoPadrao);

        beforeEach(() => {  
            store.state.usuarioLogado = undefined;
        });
        
        it('Deve estar visível na tela', () => {
            expect(wrapper.isVisible()).toBeTruthy();
        })
        
        it('Deve ser renderizada a logo da alura geek', () => {
            const logo = wrapper.findComponent("img.logo");
            expect(logo).toBeTruthy();
        });
        
        it('Deve conter barra de pesquisa', () => {
            const inputPesquisa = wrapper.get('input.busca__campo');
            const botaoPesquisa = wrapper.get('img.busca__lupa');
            
            expect(inputPesquisa.attributes('placeholder')).toEqual('O que deseja encontrar?');
            expect(botaoPesquisa.attributes('role')).toBe('button');
        });

        it('Deve conter botões de navegação para Login e Cadastro', () => {

            const botaoLogin = wrapper.get('#login');
            const botaoCadastro = wrapper.get('#cadastro');

            expect(botaoLogin).toBeDefined();
            expect(botaoCadastro).toBeDefined();

            expect(botaoLogin.attributes('to')).toContain({name: 'login'});
            expect(botaoCadastro.attributes('to')).toContain({name: 'cadastro-usuario'});
        });
    });

    describe('Quando o usuário está logado', () => {

        beforeEach(() => { 
            store.state.usuarioLogado = {
                nome: 'Usuário Teste',
                email: 'usuario@teste.com',
                role: 'usuario',
                senha: ''
            }
        });

        const wrapper = mount(CabecalhoPadrao);
        
        it('Deve conter mensagem de boas vindas', () => {
            const mensagem = wrapper.get('.mensagem-boas-vindas');
            expect(mensagem.text()).toBe('Bem-vindo, Usuário Teste');
        });

        it('Deve conter botão de log out', () => {
            const botaoLogout = wrapper.get('#logout');
            expect(botaoLogout.text()).toBe('Logout');
        });
    
    });

    describe('Quando o usuário logado é admin', () => {
        beforeEach(() => { 
            store.state.usuarioLogado = {
                nome: 'Usuário Teste',
                email: 'usuario@teste.com',
                role: 'admin',
                senha: ''
            }
        });

        const wrapper = mount(CabecalhoPadrao);

        it('Deve conter botão para cadastro de novo produto', () => {
            const botaoNovoProduto = wrapper.get('#novo-produto');
            expect(botaoNovoProduto.text()).toBe('Novo Produto');
            expect(botaoNovoProduto.attributes('to')).toContain({name: 'novo-produto'});
        });
    });
});
