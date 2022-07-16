<template>
  <section class="produtos">
    <div :id="categoria">
        <div class="produtos__cabecalho">
            <h3 class="produtos__titulo">{{nomeDisplay ? nomeDisplay : categoria}}</h3>
            <router-link :to="`/produtos?busca=${categoria}`" class="produtos__link">Ver tudo ➜</router-link>
        </div>
        <div class="lista__produtos">
            <CardProduto 
                v-for="produto in produtos"
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
            default: ''
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
        },
        busca: {
            type: String,
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
        this.filtrarProdutos();
        this.$watch(() => this.$props.busca, 
        () => {
            this.produtos = store.state.produtos;
            this.filtrarProdutos();
        });
    },
    methods: {
        filtrarProdutos() {
            if (this.categoria) {
                this.produtos = this.produtos
                    .filter(produto => produto.categoria === this.categoria);
            }
            if (this.idProdutosOcultados.length > 0) {
                this.produtos = this.produtos
                    .filter(produto => this.idProdutosOcultados.indexOf(produto.id) === -1);
            }
            if (this.maximoDeItens) {
                this.produtos = this.produtos.slice(0, this.maximoDeItens);
            }
            if (this.busca) {
                this.realizarBusca();
            }
        },
        realizarBusca() {
            this.produtos = this.produtos.filter(produto => {
                return (produto.nome.toLowerCase().includes(this.busca!.toLowerCase()) ||
                produto.categoria.toLowerCase().includes(this.busca!.toLowerCase()));
            });
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
    flex-wrap: wrap;
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