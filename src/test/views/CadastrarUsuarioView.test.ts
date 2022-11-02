import { expect, describe, it, vi } from "vitest";
import { mount } from '@vue/test-utils';
import CadastrarUsuarioView from '../../views/CadastrarUsuarioView.vue';
import store from "../../store";

describe('Na tela de cadastrar usuário', () => {

    const wrapper = mount(CadastrarUsuarioView);

    const formulario = wrapper.get('.formulario');
    const inputNome = formulario.get('#nomeUsuario');
    const inputEmail = formulario.get('#email');
    const inputSenha = formulario.get('#senha');
    const inputConfirmarSenha = formulario.get('#confirmar-senha');
    const botaoSubmit = formulario.get('.formulario__botao');
    
    it('Deve ser renderizada corretamente', () => {
        expect(wrapper.isVisible()).toBeTruthy();
        expect(wrapper).toMatchSnapshot();
    });

    it('Deve conter formulário com os inputs e botão para submit', () => {
        expect(inputNome.attributes('placeholder')).toBe('Digite seu nome');
        expect(inputEmail.attributes('placeholder')).toBe('Digite seu email');
        expect(inputSenha.attributes('placeholder')).toBe('Digite sua senha');
        expect(inputConfirmarSenha.attributes('placeholder')).toBe('Confirme a senha');
        expect(botaoSubmit.text()).toBe('Enviar dados');
        expect(botaoSubmit.attributes('disabled')).toBeFalsy();
    });

    describe('Quando os dados estiverem inválidos', () => {
        it('Deve mostrar mensagem de erro de acordo com os campos inválidos', async () => {
            await inputNome.setValue('n');
            await inputSenha.setValue('12');
            await inputConfirmarSenha.setValue('n');
            await inputEmail.setValue('email@qualquer.com');
            
            await botaoSubmit.trigger('click');
            
            // Timeout para esperar as mensagens de erro aparecerem na tela
            setTimeout(() => {
                const mensagensDeErro = formulario.findAll('.mensagem-erro').map(elemento => elemento.text());
                
                expect(mensagensDeErro).toContain('O nome deve conter entre 5 e 30 caracteres');
                expect(mensagensDeErro).toContain('A senha deve conter entre 7 e 30 caracteres');
                expect(mensagensDeErro).toContain('As senhas não coincidem');
                expect(mensagensDeErro).toHaveLength(3);
            }, 200);
        });
    });

    describe('Quando os dados estiverem válidos', () => {
        const mockCadastrarUsuario = vi.fn().mockImplementation(() => {throw new Error()});

        store.dispatch = mockCadastrarUsuario;

        it('Deve tentar cadastrar usuário e aparecer mensagem de erro quando não for possível concluir', async () => {

            await inputNome.setValue('Testando');
            await inputSenha.setValue('1234567');
            await inputConfirmarSenha.setValue('1234567');
            await inputEmail.setValue('email@qualquer.com');

            await botaoSubmit.trigger('click');
            
            // Timeout para dar tempo das mensagens aparecerem
            setTimeout(() => {
                expect(mockCadastrarUsuario).toHaveBeenCalledOnce();
                const mensagensDeErro = formulario.findAll('.mensagem-erro').map(elemento => elemento.text());
                expect(mensagensDeErro).toContain('Já existe um usuário cadastrado com esse email!');
            }, 200);
        });
    });

});
