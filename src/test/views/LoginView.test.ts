import { expect, describe, it, vi } from "vitest";
import { mount } from '@vue/test-utils';
import LoginView from '../../views/LoginView.vue';
import store from "../../store";

describe('Na tela de login', () => {
    
    const wrapper = mount(LoginView);
    const formulario = wrapper.get('.formulario');
    const inputEmail = formulario.get('#email');
    const inputSenha = formulario.get('#senha');
    const botaoSubmit = formulario.get('.formulario__botao');

    it('Deve ser renderizada corretamente', () => {
        expect(wrapper.isVisible()).toBeTruthy();
        expect(wrapper).toMatchSnapshot();
    });

    it('Deve conter formulário com título, inputs e botão', () => {
        const titulo = formulario.get('.formulario__titulo');
        expect(titulo.text()).toBe('Iniciar Sessão');

        expect(inputEmail.attributes('placeholder')).toBe('Digite seu email');
        expect(inputSenha.attributes('placeholder')).toBe('Digite sua senha');
        expect(botaoSubmit.text()).toBe('Entrar');
        expect(botaoSubmit.attributes('disabled')).toBeFalsy();
    });

    it('Deve tentar fazer login e mostrar mensagem de erro quando não for possível logar', async () => {
        const mockFazerLogin = vi.fn().mockImplementation(() => false);
        store.dispatch = mockFazerLogin;

        await inputEmail.setValue('email@valido.com');
        await inputSenha.setValue('senhaCorreta');
        await botaoSubmit.trigger('click');

        // Esperando a mensagem aparecer e mock ser chamado
        setTimeout(() => {
            const mensagemErro = formulario.get('.mensagem-erro');
            expect(mensagemErro.text()).toBe('Email ou senha inválidos!');
            
            expect(mockFazerLogin).toHaveBeenCalledOnce();
        }, 200);
    });
});
