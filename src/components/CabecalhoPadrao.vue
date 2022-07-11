<template>
  <header class="cabecalho container">
    <div class="container">
      <img src="@/assets/Logo.png" alt="Logo da Alura Geek">
      <input class="busca" name="busca" type="search" placeholder="O que deseja encontrar? "/>
    </div>
    <a href="" class="botao-login">Login</a>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
    name: 'CabecalhoPadrao'
})
</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
  column-gap: 1.5rem;
}
.cabecalho {
  justify-content: space-between;
  padding: 2rem 8rem;
}
.botao-login {
  border: 2px solid var(--azul);
  color: var(--azul);
  text-decoration: none;
  font-weight: 400;
  font-size: 16px;
  padding: 1rem 5rem;
}
.busca {
  background-color: var(--cinza-claro);
  padding: .75rem;
  width: 30vw;
  border-radius: 10px;
  background-image: url('@/assets/icons/busca.svg');
  background-repeat: no-repeat;
  background-position: right;
  color: var(--cinza);
}
</style>