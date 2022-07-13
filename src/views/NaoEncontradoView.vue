<template>
  <section class="nao-encontrado">
    <h2 class="nao-encontrado__titulo">Nada foi encontrado =(</h2>
    <h3 class="nao-encontrado__subtitulo">Erro 404</h3>
    <a class="botao-voltar" @click="this.$router.back()">Voltar</a>
  </section>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
    name: 'NaoEncontradoView'
})
</script>

<style scoped>
.nao-encontrado {
    padding: 2rem 8rem;
    color: var(--cinza-escuro);
    background-color: var(--cinza-claro);
    text-align: center;
}
.nao-encontrado__titulo {
    font-size: 2.25rem;
    font-weight: 700;
    margin-bottom: 2rem;
}
.nao-encontrado__subtitulo {
    font-size: 2rem;
    color: var(--cinza);
    font-weight: 400;
    margin-bottom: 2rem;
}
.botao-voltar {
    background-color: var(--azul);
    color: var(--branco);
    padding: .5rem 3rem;
    font-size: 1.5rem;
    font-weight: 300;
    border-radius: 1rem;
    font-family: var(--fonte-principal);
    text-decoration: none;
    cursor: pointer;
}
</style>