<template>
    <section class="produto-detalhado">
        <NaoEncontradoView v-if="produtoPrincipal == undefined"/>
        <div v-else>
            <ProdutoDetalhado
                :nome="produtoPrincipal.nome"
                :descricao="produtoPrincipal.descricao"
                :urlImagem="produtoPrincipal.urlImagem"
                :preco="produtoPrincipal.preco"
            />
            <ListaDeProdutos :categoria="produtoPrincipal.categoria" :nomeDisplay="'Produtos Similares'"/>
        </div>
    </section>
</template>

<script lang="ts">
import store from "@/store";
import { computed, defineComponent } from "@vue/runtime-core";
import ProdutoDetalhado from '@/components/Produtos/ProdutoDetalhado.vue';
import ListaDeProdutos from '@/components/Produtos/ListaDeProdutos.vue';
import NaoEncontradoView from '@/views/NaoEncontradoView.vue';

export default defineComponent({
    name: 'ProdutoDetalhadoView',
    components: {
        ProdutoDetalhado,
        ListaDeProdutos,
        NaoEncontradoView
    },
    data() {
        store.dispatch('OBTER_PRODUTOS');
        const id = this.$route.params.id;
        const produtoEncontrado = store.state.produtos.find(produto => produto.id == id);
        return {
            produtoPrincipal: computed(() => produtoEncontrado),
            id: id
        }
    }
})
</script>
