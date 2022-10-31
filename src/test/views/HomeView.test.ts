import { expect, describe, it, vi, beforeEach } from "vitest";
import { mount } from '@vue/test-utils';
import HomeView from '../../views/HomeView.vue';
import store from '../../store';

describe('Na página home', () => {
    
    store.dispatch = vi.fn().mockImplementation(() => {});
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
