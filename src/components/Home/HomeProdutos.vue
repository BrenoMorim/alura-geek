<template>
  <section class="produtos">
    <ListaDeProdutos categoria="Star Wars"/>    
    <ListaDeProdutos categoria="Consoles"/>
    <ListaDeProdutos categoria="Diversos"/>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import ListaDeProdutos from "../Produtos/ListaDeProdutos.vue";

export default defineComponent({
    name: 'HomeProdutos',
    components: {
        ListaDeProdutos
    }
})
</script>
