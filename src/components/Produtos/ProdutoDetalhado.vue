<template>
  <article class="produto-detalhado">
    <div class="container">
        <div class="imagem-container">
            <img class="produto__imagem" :src="urlImagem" :alt="nome">
        </div>
        <div class="descricao__container">
            <h2 class="produto__nome">{{nome}}</h2>
            <p class="produto__descricao">{{descricao}}</p>
            <h4 class="produto__preco">Preço: R$ {{preco?.toFixed(2).replace('.', ',')}}</h4>
            <div v-if="usuarioLogado?.role === 'admin'">
                <router-link :to="`/produtos/editar/${id}`" class="botao botao--editar">Editar Produto</router-link>
                <button @click="excluirProduto()" class="botao botao--excluir">Excluir Produto</button>
            </div>
        </div>
    </div>
  </article>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import IUsuario from "../../types/IUsuario";
import store from "../../store";
import { DELETAR_PRODUTO } from "../../types/Actions";

export default defineComponent({
    name: 'ProdutoDetalhado',
    data() {
        return {
            usuarioLogado: {} as IUsuario | undefined
        }
    },
    created() {
        this.usuarioLogado = store.state.usuarioLogado;
    },
    methods: {
        excluirProduto() {
            try {
                store.dispatch(DELETAR_PRODUTO, this.id);
                this.$router.push({name: 'home'});
            } catch(erro) {
                console.log(erro);
            }
        }
    },
    props: {
        id: {
            required: true,
            default: ''
        },
        nome: {
            required: true,
            default: ''
        },
        preco: {
            required: true,
            default: 0
        },
        urlImagem: {
            required: true,
            default: ''
        },
        descricao: {
            required: true,
            default: ''
        }
    }
})
</script>

<style scoped>
.produto-detalhado {
    padding: var(--padding-pagina);
    color: var(--cinza-escuro);
}
.container {
    display: flex;
}
@media screen and (max-width: 768px) {
    .container {
        flex-direction: column;
        align-items: center;
    }
}
.produto__nome {
    font-size: 2.75rem;
    font-weight: 700;
    margin-bottom: 1.25rem;
}
.imagem-container {
    width: 36%;
    min-width: 200px;
}
.produto__imagem {
    width: 100%;
    max-width: 400px;
    margin: .5rem auto;
}
.produto__preco {
    font-size: 2rem;
    font-weight: 700;
    margin-top: 1.5rem;
}
.descricao__container {
    width: auto;
    padding: 2rem;
    margin-left: 1.5rem;
}
.produto__descricao {
    font-size: 2rem;
    font-weight: 300;
}
.botao {
    margin-top: 1rem;
    padding: 1rem 1.25rem;
    color: var(--branco);
    font-size: 1.2rem;
    cursor: pointer;
    border: none;
    line-height: 1.2rem;
}
.botao--editar {
    background-color: var(--azul);
    margin-right: 1rem;
    text-decoration: none;
}
.botao--excluir {
    background-color: var(--vermelho);
    font-family: var(--fonte-principal);
}
</style>