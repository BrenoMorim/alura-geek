<template>
  <section class="banner">
    <h1 class="titulo">Dezembro Promocional</h1>
    <h2 class="subtitulo">Produtos selecionados com até 33% de desconto</h2>
    <a href="#consoles" class="botao">Ver Consoles</a>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
    name: 'HomeBanner'
})
</script>

<style scoped>
.banner {
    background-image: url('@/assets/banner.png');
    background-repeat: no-repeat;
    background-size: cover;
    max-width: 100vw;
    padding: 13rem 8rem 5rem 8rem;
    color: var(--branco);
}
.titulo {
    font-size: 3.25rem;
    margin-bottom: 2rem;
    font-weight: 700;
}
.subtitulo {
    font-size: 1.75rem;
    font-weight: 400;
    margin-bottom: 3.5rem;
}
.botao {
    text-decoration: none;
    padding: 1.25rem;
    background-color: var(--azul);
    color: var(--branco);
}
</style>