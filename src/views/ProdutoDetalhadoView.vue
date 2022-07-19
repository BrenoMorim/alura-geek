<template>
    <section class="produto-detalhado">
        <NaoEncontradoView v-if="produtoPrincipal == undefined"/>
        <div v-else>
            <ProdutoDetalhado
                :nome="produtoPrincipal.nome"
                :descricao="produtoPrincipal.descricao"
                :urlImagem="produtoPrincipal.urlImagem"
                :preco="produtoPrincipal.preco"
                :id="produtoPrincipal.id"
            />
            <ListaDeProdutos 
                :categoria="produtoPrincipal.categoria" 
                :nomeDisplay="'Produtos Similares'"
                :idProdutosOcultados="[produtoPrincipal.id]"
                :maximoDeItens="10"
            />
        </div>
    </section>
</template>

<script lang="ts">
import store from "@/store";
import { defineComponent } from "@vue/runtime-core";
import ProdutoDetalhado from '@/components/Produtos/ProdutoDetalhado.vue';
import ListaDeProdutos from '@/components/Produtos/ListaDeProdutos.vue';
import NaoEncontradoView from '@/views/NaoEncontradoView.vue';
import { OBTER_PRODUTO_POR_ID } from "@/types/Actions";
import IProduto from "@/types/IProduto";

export default defineComponent({
    name: 'ProdutoDetalhadoView',
    components: {
        ProdutoDetalhado,
        ListaDeProdutos,
        NaoEncontradoView
    },
    data() {
        return {
            produtoPrincipal: {} as IProduto | undefined
        }
    },
    async created() {
        await this.carregarProduto();
        this.$watch(() => this.$route.params, async () => {
            await this.carregarProduto();
        })
    },
    methods: {
        async carregarProduto() {
            await store.dispatch(OBTER_PRODUTO_POR_ID, this.$route.params.id);
            this.produtoPrincipal = store.state.produtoDetalhado;
        }
    }
})
</script>
