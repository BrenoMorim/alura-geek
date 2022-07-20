<template>
  <section class="banner">
    <h1 class="titulo">Dezembro Promocional</h1>
    <h2 class="subtitulo">Produtos selecionados com até 33% de desconto</h2>
    <a href="#Consoles" class="botao">Ver Consoles</a>
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
    background-image: url('@/assets/img/banner.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    max-width: 100vw;
    height: auto;
    color: var(--branco);
    padding: var(--padding-pagina);
    padding-top: 20vh;
    padding-bottom: 5vh;
    box-sizing: border-box;
    text-shadow: -1px 0 #222222, 0 1px #222222, 1px 0 #222222, 0 -1px #222222;
}
.titulo {
    font-size: 3.25rem;
    margin-bottom: 2rem;
    font-weight: 700;
}
.subtitulo {
    font-size: 1.75rem;
    font-weight: 400;
    margin-bottom: 3.25rem;
}
.botao {
    text-decoration: none;
    padding: 1.25rem;
    background-color: var(--azul);
    color: var(--branco);
    display: inline-block;
}
@media screen and (max-width: 768px) {
    .titulo {
        font-size: 2rem;
        margin-bottom: 1vh;
    }
    .subtitulo {
        font-size: 1.5rem;
        margin-bottom: 1vh;
    }
    .botao {
        padding: 1rem;
    }
    .banner {
        padding-top: 5vh;
    }
}
</style>