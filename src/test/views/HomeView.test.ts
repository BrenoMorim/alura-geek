import { expect, describe, it } from "vitest";
import { mount } from '@vue/test-utils';
import HomeView from '../../views/HomeView.vue';

describe('Na página home', () => {
    
    const wrapper = mount(HomeView);
    
    it('Deve estar visível', () => {
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.isVisible()).toBeTruthy();
    });

    it('Deve conter seções com produtos', () => {
        expect(wrapper.findAll('.produtos')).toHaveLength(3);
    });

    it('Deve conter seção com banner', () => {
        expect(wrapper.get('.banner').isVisible()).toBeTruthy();
    });
});
