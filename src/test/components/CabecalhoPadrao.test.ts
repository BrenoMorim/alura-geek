import { expect, describe, it } from "vitest";
import { mount } from '@vue/test-utils';
import CabecalhoPadrao from '../../components/CabecalhoPadrao.vue';

describe('No cabeçalho padrão', () => {
    
    const wrapper = mount(CabecalhoPadrao);
    
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
        const botoes = wrapper.findAll('router-link.cabecalho__botao');
        const botaoLogin = botoes.find(botao => botao.text() === 'Login');
        const botaoCadastro = botoes.find(botao => botao.text() === 'Cadastre-se');

        expect(botoes).toHaveLength(2);
        expect(botaoLogin).toBeDefined();
        expect(botaoCadastro).toBeDefined();

        expect(botaoLogin?.attributes('to')).toContain({name: 'login'});
        expect(botaoCadastro?.attributes('to')).toContain({name: 'cadastro-usuario'});
    });
});
