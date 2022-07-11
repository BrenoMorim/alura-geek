<template>
    <article class="produto__card">
        <img class="produto__imagem" :src="urlImagem" :alt="nome"/>
        <p class="produto__nome">{{nome}}</p>
        <p class="produto__preco">R$ {{Number(preco).toFixed(2).replace('.', ',')}}</p>
        <a href="" class="produto__link">Ver produto</a>
    </article>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
    name: 'CardProduto',
    props: {
        nome: {
            required: true,
            type: String
        },
        preco: {
            required: true,
            type: String
        },
        urlImagem: {
            required: true,
            type: String
        },
    }
})
</script>

<style scoped>
.produto__card {
    width: 10rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    row-gap: .5rem;
    color: var(--cinza-escuro);
    margin: 1rem;
}
.produto__imagem {
    width: 10rem;
    height: 10rem;
}
.produto__nome {
    font-weight: 400;
    font-size: 14px;
}
.produto__preco {
    font-size: 16px;
    font-weight: 700;
}
.produto__link {
    color: var(--azul);
    text-decoration: none;
    font-weight: 700;
}
</style>