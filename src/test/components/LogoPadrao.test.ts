import { expect, describe, it } from "vitest";
import { mount } from '@vue/test-utils';
import LogoPadrao from '../../components/LogoPadrao.vue';

describe('Na logo padrão', () => {
    
    const wrapper = mount(LogoPadrao);

    it('Deve conter router-link para navegação até a home envolvendo a logo', () => {
        const routerLink = wrapper.get('.logo-container');
        expect(routerLink.attributes('to')).toContain({name: 'home'});
        
        const imagemLogo = routerLink.get('img.logo');
        expect(imagemLogo.attributes('alt')).toBe('Logo da Alura Geek');
    });
});
