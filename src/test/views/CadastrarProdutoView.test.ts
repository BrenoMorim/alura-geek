import { expect, describe, it, vi } from "vitest";
import { mount } from '@vue/test-utils';
import CadastrarProdutoView from '../../views/CadastrarProdutoView.vue';
import store from "../../store";

describe('Na tela de cadastrar produto', () => {

    store.state.usuarioLogado = {
        nome: 'Usuário Teste',
        email: 'usuario@teste.com',
        role: 'admin',
        senha: ''
    }

    const wrapper = mount(CadastrarProdutoView);

    const formulario = wrapper.get('.formulario');
    const inputNome = formulario.get('#nome');
    const inputPreco = formulario.get('#preco');
    const inputDescricao = formulario.get('#descricao');
    const inputCategoria = formulario.get('#categoria');
    const inputUrlImagem = formulario.get('#urlImagem');
    const botaoSubmit = formulario.get('.formulario__botao');
    
    it('Deve ser renderizada corretamente', () => {
        expect(wrapper.isVisible()).toBeTruthy();
        expect(wrapper).toMatchSnapshot();
    });

    it('Deve conter formulário com os inputs e botão para submit', () => {
        expect(inputNome.attributes('placeholder')).toBe('Nome do produto');
        expect(inputDescricao.attributes('placeholder')).toBe('Descrição do produto');
        expect(inputPreco.attributes('placeholder')).toBe('Preço do produto');
        expect(inputCategoria).toBeDefined();
        expect(inputUrlImagem.attributes('placeholder')).toBe('Url da imagem do produto');
        expect(botaoSubmit.text()).toBe('Enviar dados');
        expect(botaoSubmit.attributes('disabled')).toBeFalsy();
    });

    it('Deve conter preview da imagem do produto baseado do input da url', async () => {
        const urlQualquer = 'www.sitedefotos.com/fotoDoProduto';
        const imagemPreview = formulario.get('.preview-imagem');
        expect(imagemPreview.attributes('alt')).toBe('Imagem não carregada =(');

        await inputUrlImagem.setValue(urlQualquer);
        expect(imagemPreview.attributes('src')).toBe(urlQualquer);
    });

    describe('Quando os dados estiverem inválidos', () => {
        it('Deve mostrar mensagem de erro de acordo com os campos inválidos', async () => {
            await inputNome.setValue('n');
            await inputDescricao.setValue('12');
            await inputCategoria.setValue('n');
            await inputPreco.setValue(-12);
            
            await botaoSubmit.trigger('click');
            
            // Timeout para esperar as mensagens de erro aparecerem na tela
            setTimeout(() => {
                const mensagensDeErro = formulario.findAll('.mensagem-erro').map(elemento => elemento.text());
                
                expect(mensagensDeErro).toContain('O nome do produto deve ter entre 5 e 30 caracteres');
                expect(mensagensDeErro).toContain('A descrição do produto deve ter entre 12 e 250 caracteres');
                expect(mensagensDeErro).toContain('Preço inválido!');
                expect(mensagensDeErro).toContain('Categoria inválida!');
                expect(mensagensDeErro).toHaveLength(4);
            }, 200);
        });
    });

    describe('Quando os dados estiverem válidos', () => {
        
        it.each([
            [true, 'sucesso', 'Produto cadastrado com sucesso!'],
            [false, 'erro', 'Não foi possível cadastrar esse produto =(']
        ])('Deve cadastrar produto e mostrar mensagem se foi concluída com sucesso ou não', async (produtoFoiCadastrado, caso, mensagem) => {
            const mockCadastrarProduto = vi.fn().mockImplementation(() => produtoFoiCadastrado);
            store.dispatch = mockCadastrarProduto;

            await inputNome.setValue('Nome teste');
            await inputDescricao.setValue('Testando a Descrição');
            await inputCategoria.setValue('Diversos');
            await inputPreco.setValue(12);

            await botaoSubmit.trigger('click');
            
            // Timeout para dar tempo das mensagens aparecerem
            setTimeout(() => {
                expect(mockCadastrarProduto).toHaveBeenCalledOnce();
                const mensagens = formulario.findAll(`.mensagem-${caso}`).map(elemento => elemento.text());
                expect(mensagens).toContain(mensagem);
            }, 200);
        });
    });

});
