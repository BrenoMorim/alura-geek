import { expect, describe, it, vi } from "vitest";
import { mount } from '@vue/test-utils';
import FooterPadrao from '../../components/FooterPadrao.vue';
import store from '../../store';

describe('No footer padrão', () => {
    
    const wrapper = mount(FooterPadrao);

    it('Deve conter links para navegação', () => {
        const links = wrapper.findAll('.link');
        expect(links).toHaveLength(6);
    });

    it('Deve conter informações do desenvolvedor', () => {
        const infoDesenvolvedor = wrapper.get('.info-desenvolvedor');
        expect(infoDesenvolvedor.get('h2').text())
            .toContain('Desenvolvido por Breno Morim');
    });

    it('Deve conter formulário para envio de mensagens', () => {
        const formulario = wrapper.get('.formulario');
        
        const titulo = formulario.get('.formulario__titulo');
        expect(titulo.text()).toBe('Fale conosco');

        const inputNome = formulario.get('input#nome');
        expect(inputNome.attributes('placeholder')).toEqual('Nome');

        const inputMensagem = formulario.get('#mensagem');
        expect(inputMensagem.attributes('placeholder')).toEqual('Escreva sua mensagem');

        const botaoSubmit = formulario.get('.formulario__botao');
        expect(botaoSubmit.text()).toBe('Enviar Mensagem');

        it('Deve aparecer mensagem de erro quando nome ou mensagem forem muito curtas', async () => { 
            await inputMensagem.setValue('a');
            await inputNome.setValue('a');
            
            botaoSubmit.trigger('click');

            const mensagemDeErro = formulario.get('.mensagem-erro');
            expect(mensagemDeErro.text()).toBe('Nome ou mensagem muito curtas!');
        });

        it('Deve enviar mensagem quando dados forem válidos', async () => {

            const mockEnviarMensagem = vi.fn().mockImplementation(() => {});

            store.dispatch = mockEnviarMensagem;

            await inputMensagem.setValue('Mensagem válida');
            await inputNome.setValue('Nome válido');

            botaoSubmit.trigger('click');
            
            const mensagemSucesso = formulario.get('.mensagem-sucesso');
            expect(mensagemSucesso.text()).toBe('Mensagem enviada com sucesso');
            expect(mockEnviarMensagem).toHaveBeenCalledOnce();
        });

        it('Deve conter logo da alura geek', () => {
            const logo = wrapper.find('.logo');
            expect(logo).toBeTruthy();
        });
    });
});
