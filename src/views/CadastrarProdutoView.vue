<template>
  <form class="formulario pagina-formulario" @submit.prevent="enviarFormulario()">
    <h3 class="formulario__titulo formulario__titulo--maior">Cadastrar Produto</h3>
    <div>
        <label for="nome" class="formulario__label">Nome:</label>
        <input v-model="produto.nome" id="nome" name="nome" type="text" class="formulario__campo formulario__campo--maior" placeholder="Nome do produto" required>
    </div>
    <div>
        <label for="descricao" class="formulario__label">Descrição:</label>
        <textarea v-model="produto.descricao" id="descricao" name="descricao" type="text" class="formulario__campo formulario__campo--maior" placeholder="Descrição do produto" required />
    </div>
    <div class="campos-menores">
        <div class="preco-container">
            <label for="preco" class="formulario__label">Preço:</label>
            <input v-model="produto.preco" id="preco" type="number" name="preco" class="formulario__campo" placeholder="Preço do produto" required>
        </div>
        <div class="categoria-container">
            <label for="categoria" class="formulario__label">Categoria:</label>
            <select name="categoria" required class="formulario__campo" id="categoria" v-model="produto.categoria">
                <option value="exemplo" disabled>Categoria do produto:</option>
                <option v-for="categoria in categorias" :key="categoria" :value="categoria">
                    {{ categoria }}
                </option>
            </select>
        </div>
    </div>
    <div>
        <label for="urlImagem" class="formulario__label">Imagem (por url):</label>
        <input v-model="produto.urlImagem" id="urlImagem" type="url" name="urlImagem" class="formulario__campo formulario__campo--maior" placeholder="Url da imagem do produto" required>
    </div>
    <div>
        <p class="formulario__label">Preview da imagem:</p>
        <img class="preview-imagem" :src="produto.urlImagem" alt="Imagem não carregada =(">
    </div>
    <button class="formulario__botao formulario__botao--maior" type="submit">Enviar dados</button>
    <p v-for="(mensagemDeErro, index) in mensagensDeErro" :key="index" class="mensagem-erro">{{mensagemDeErro}}</p>
    <p v-if="mensagemSucesso" class="mensagem-sucesso">{{ mensagemSucesso }}</p>
  </form>
</template>
<script lang="ts">
import store from "../store";
import IProduto from "../types/IProduto";
import { Categorias } from "../types/Categorias";
import { defineComponent } from "@vue/runtime-core";
import IUsuario from "../types/IUsuario";
import { CADASTRAR_PRODUTO, OBTER_PRODUTO_POR_ID } from "../types/Actions";

export default defineComponent({
    name: 'CadastrarProdutoView',
    created() {
        this.usuarioLogado = store.state.usuarioLogado;
        if (this.usuarioLogado?.role !== 'admin') {
            this.$router.push({ name: 'home' });
        }
        if (this.$route.params.id) {
            store.dispatch(OBTER_PRODUTO_POR_ID, this.$route.params.id);
            this.produto = store.state.produtoDetalhado as IProduto;
        }
    },
    data() {
      return {
        usuarioLogado: {} as IUsuario | undefined,
        produto: {} as IProduto,
        categorias: Categorias,
        mensagensDeErro: [] as string[],
        mensagemSucesso: ''
      }
    },
    methods: {
        async enviarFormulario() {
            this.mensagensDeErro = [];
            this.mensagemSucesso = '';
            const formularioValido = this.validarFormulario();
            if (!formularioValido) return;
            const produtoFoiCadastrado = await store.dispatch(CADASTRAR_PRODUTO, this.produto);
            if (produtoFoiCadastrado === false) {
                this.mensagensDeErro.push('Não foi possível cadastrar esse produto =(');
                return;
            }
            this.mensagemSucesso = "Produto cadastrado com sucesso!";
        },
        validarFormulario(): boolean {
            let valido = true;
            
            if (this.produto.nome.length <= 5 || this.produto.nome.length >= 30) {
                valido = false;
                this.mensagensDeErro.push('O nome do produto deve ter entre 5 e 30 caracteres');
            }
            if (this.produto.descricao.length < 12 || this.produto.descricao.length > 250) {
                valido = false;
                this.mensagensDeErro.push('A descrição do produto deve ter entre 12 e 250 caracteres');
            }
            if (this.produto.preco <= 0) {
                valido = false;
                this.mensagensDeErro.push('Preço inválido!');
            }
            if (this.categorias.indexOf(this.produto.categoria) === -1) {
                valido = false;
                this.mensagensDeErro.push('Categoria inválida!');
            }
            return valido;
        }
    }
})
</script>
<style scoped>
@import url('@/assets/css/formulario.css');

@media screen and (min-width: 1024px) {
    .campos-menores {
        width: 45vw;
        display: flex;
        align-items: center;
    }
    #preco {
        margin-right: 1rem;
        width: fit-content;
    }
}
.preview-imagem {
    max-width: 80vw;
}
.categoria-container {
    width: 100%;
}
#categoria {
    width: 100%;
}
.preco-container {
    width: fit-content;
}
</style>