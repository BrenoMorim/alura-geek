<template>
  <article class="produto-detalhado">
    <div class="container">
        <div class="imagem-container">
            <img class="produto__imagem" :src="urlImagem" :alt="nome">
        </div>
        <div class="descricao__container">
            <h2 class="produto__nome">{{nome}}</h2>
            <p class="produto__descricao">{{descricao}}</p>
            <h4 class="produto__preco">Preço: R$ {{preco.toFixed(2).replace('.', ',')}}</h4>
        </div>
    </div>
  </article>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
    name: 'ProdutoDetalhado',
    props: {
        nome: {
            required: true,
            type: String
        },
        preco: {
            required: true,
            type: Number
        },
        urlImagem: {
            required: true,
            type: String
        },
        descricao: {
            required: true,
            type: String
        }
    }
})
</script>

<style scoped>
.produto-detalhado {
    padding: 2rem 8rem;
    color: var(--cinza-escuro);
}
.container {
    display: flex;
}
.produto__nome {
    font-size: 2.75rem;
    font-weight: 700;
    margin-bottom: 1.25rem;
}
.imagem-container {
    width: 36%;
}
.produto__imagem {
    width: 100%;
    max-width: 400px;
    margin: .5rem auto;
}
.produto__preco {
    font-size: 2rem;
    font-weight: 700;
    margin-top: 1.5rem;
}
.descricao__container {
    width: auto;
    padding: 2rem;
    margin-left: 1.5rem;
}
.produto__descricao {
    font-size: 2rem;
    font-weight: 300;
}
</style>