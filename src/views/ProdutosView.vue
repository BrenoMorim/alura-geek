<template>
  <section>
    <ListaDeProdutos
        :nomeDisplay="busca ? `Buscando por '${busca}'` : 'Todos os produtos'"
        :busca="busca"
    />
  </section>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import ListaDeProdutos from "@/components/Produtos/ListaDeProdutos.vue";

export default defineComponent({
    name: 'ProdutosView',
    components: {
        ListaDeProdutos
    },
    data() {
        return {
            busca: ''
        }
    },
    created() {
        this.busca = this.$route.query.busca as string;
        this.$watch(() => this.$route.query,
        () => {
            this.busca = this.$route.query.busca as string;
        });
    }
})
</script>
