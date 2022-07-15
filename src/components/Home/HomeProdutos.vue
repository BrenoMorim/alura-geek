<template>
  <section class="produtos">
    <ListaDeProdutos categoria="Star Wars" :maximoDeItens="6"/>    
    <ListaDeProdutos categoria="Consoles" :maximoDeItens="6"/>
    <ListaDeProdutos categoria="Diversos" :maximoDeItens="6"/>
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
