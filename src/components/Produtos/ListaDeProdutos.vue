<template>
  <section class="produtos">
    <div :id="categoria">
        <div class="produtos__cabecalho">
            <h3 class="produtos__titulo">{{nomeDisplay ? nomeDisplay : categoria}}</h3>
            <a href="" class="produtos__link">Ver tudo ➜</a>
        </div>
        <div class="lista__produtos">
            <CardProduto 
                v-for="produto in produtos.filter(produto => produto.categoria === categoria)"
                v-bind:key="produto.id"
                :id="produto.id"
                :nome="produto.nome"
                :preco="produto.preco.toLocaleString()"
                :urlImagem="produto.urlImagem"
            />
        </div>
    </div>
  </section>
</template>

<script lang="ts">
import store from "@/store";
import IProduto from "@/types/IProduto";
import { defineComponent } from "@vue/runtime-core";
import CardProduto from "./CardProduto.vue";

export default defineComponent({
    name: 'ListaDeProdutos',
    props: {
        categoria: {
            type: String,
            required: false
        },
        nomeDisplay: {
            type: String,
            required: false
        },
        idProdutosOcultados: {
            default: [] as string[]
        },
        maximoDeItens: {
            type: Number,
            required: false
        }
    },
    components: {
        CardProduto
    },
    data() {
        return {
            produtos: [] as IProduto[]
        }
    },
    async created() {
        await store.dispatch('OBTER_PRODUTOS');
        this.produtos = store.state.produtos;
        if (this.categoria) {
            this.produtos = this.produtos.filter(produto => this.filtrarProduto(produto));
        }
        if (this.maximoDeItens) {
            this.produtos = this.produtos.slice(0, this.maximoDeItens);
        }
    },
    methods: {
        filtrarProduto(produto: IProduto) {
            return (produto.categoria === this.categoria &&
                this.idProdutosOcultados.indexOf(produto.id) === -1)
        }
    }
})
</script>

<style scoped>
.produtos {
    padding: 4rem 8rem 1rem 8rem;
}
.produtos__cabecalho {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
}
.lista__produtos {
    display: flex;
    align-items: center;
}
.produtos__titulo {
    color: var(--cinza-escuro);
    font-size: 3rem;
}
.produtos__link {
    color: var(--azul);
    font-size: 1rem;
    text-decoration: none;
    font-weight: 700;
}
</style>