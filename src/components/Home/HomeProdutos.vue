<template>
  <section class="produtos">
    <ListaDeProdutos categoria="star-wars" titulo="Star Wars"/>    
    <ListaDeProdutos categoria="consoles" titulo="Consoles"/>
    <ListaDeProdutos categoria="diversos" titulo="Diversos"/>
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
