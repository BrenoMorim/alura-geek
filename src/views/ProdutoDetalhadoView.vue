<template>
    <section class="produto-detalhado">
        <ProdutoDetalhado 
            :nome="produtoPrincipal.nome"
            :descricao="produtoPrincipal.descricao"
            :urlImagem="produtoPrincipal.urlImagem"
            :preco="produtoPrincipal.preco"
        />
        <ListaDeProdutos :categoria="produtoPrincipal.categoria" :nomeDisplay="'Produtos Similares'"/>
    </section>
</template>

<script lang="ts">
import store from "@/store";
import { computed, defineComponent } from "@vue/runtime-core";
import ProdutoDetalhado from '@/components/Produtos/ProdutoDetalhado.vue';
import ListaDeProdutos from '@/components/Produtos/ListaDeProdutos.vue';

export default defineComponent({
    name: 'ProdutoDetalhadoView',
    components: {
        ProdutoDetalhado,
        ListaDeProdutos
    },
    data() {
        store.dispatch('OBTER_PRODUTOS');
        return {
            produtoPrincipal: computed(() => store.state.produtos.find(produto => produto.id == this.$route.params.id))
        }
    }
})
</script>

<style scoped>

</style>