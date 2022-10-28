<template>
  <section>
    <ListaDeProdutos 
      v-for="(categoria, index) in categorias" 
      :key="index" 
      :categoria="categoria" 
      :maximoDeItens="6"
    />    
  </section>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import ListaDeProdutos from "../Produtos/ListaDeProdutos.vue";
import { Categorias } from "../../types/Categorias";

export default defineComponent({
    name: 'HomeProdutos',
    data() {
      return {
        categorias: Categorias
      }
    },
    components: {
        ListaDeProdutos
    }
})
</script>