import { expect, describe, it } from "vitest";
import { mount } from '@vue/test-utils';
import NaoEncontradoView from '../../views/NaoEncontradoView.vue';

describe('Na página de não encontrado', () => {

    const wrapper = mount(NaoEncontradoView); 

    it('Deve ser renderizada', () => {
        expect(wrapper.isVisible()).toBeTruthy();
        expect(wrapper).toMatchSnapshot();
    });

    it('Deve conter mensagem e botão para voltar', () => {
        expect(wrapper.get('.nao-encontrado__titulo').text()).toBe('Nada foi encontrado =(');
        expect(wrapper.get('.nao-encontrado__subtitulo').text()).toBe('Erro 404');
        
        const botaoVoltar = wrapper.get('.botao-voltar');
        expect(botaoVoltar.text()).toBe('Voltar');
        expect(botaoVoltar.attributes('disabled')).toBeFalsy();
    });

});
