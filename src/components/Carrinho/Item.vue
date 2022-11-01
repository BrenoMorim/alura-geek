<template>
    <article class="item">
        <img :src="produto.urlImagem" :alt="`Imagem de ${produto.nome}`" class="item__imagem-produto">
        <h3 class="item__nome">{{produto.nome}}</h3>
        <p class="item__preco">Preço: R$ {{produto.preco.toFixed(2).replace('.', ',')}}</p>
        <div class="item__quantidade__container">
            <h4 class="item__quantidade__titulo">Quantidade:</h4>
            <div class="item__botoes-alterar-quantidade">
                <button class="item__botao" id="adicionar" :disabled="quantidade >= 10" @click="aumentarQuantidade()">+</button>
                <p class="item__quantidade">{{quantidade}}</p>
                <button class="item__botao" id="diminuir" :disabled="quantidade <= 1" @click="diminuirQuantidade()">-</button>
            </div>
        </div>
        <button class="item__remover" @click="excluirDoCarrinho()">Remover</button>
    </article>
</template>

<script lang="ts">
import IProduto from "../../types/IProduto";
import { defineComponent } from "@vue/runtime-core";
import store from '../../store';
import { AUMENTAR_QUANTIDADE_ITEM, DIMINUIR_QUANTIDADE_ITEM, REMOVER_ITEM_CARRINHO } from "../../types/Actions";

export default defineComponent({
    name: 'Item',
    props: {
        produto: {
            default: {} as IProduto,
            required: true
        },
        quantidade: {
            type: Number,
            required: true
        }
    },
    methods: {
        aumentarQuantidade() {
            store.dispatch(AUMENTAR_QUANTIDADE_ITEM, {
                produto: this.produto, 
                quantidade: this.quantidade
            });
        },
        diminuirQuantidade() {
            store.dispatch(DIMINUIR_QUANTIDADE_ITEM, {
                produto: this.produto, 
                quantidade: this.quantidade
            });
        },
        excluirDoCarrinho() {
            store.dispatch(REMOVER_ITEM_CARRINHO, {
                produto: this.produto,
                quantidade: this.quantidade
            });
        }
    }
});
</script>

<style scoped>
.item {
    background-color: var(--cinza-claro);
    padding: 1rem 2rem;
    margin: 1rem 0;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-between;
    border-radius: 1.25rem;
    height: 7rem;
}
.item__imagem-produto {
    display: inline-block;
    max-width: 6rem;
    max-height: 6rem;
    border-radius: .75rem;
}
.item__nome {
    font-size: 1.5rem;
}
.item__preco {
    font-size: 1.5rem;
    font-weight: 300;
}
.item__quantidade__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    row-gap: 1rem;
}
.item__botoes-alterar-quantidade {
    display: flex;
    flex-direction: row-reverse;
    column-gap: 1.2rem;
    flex-wrap: wrap;
    align-items: center;
}
.item__quantidade__titulo {
    font-size: 1.4rem;
    font-weight: 600;
}
.item__quantidade {
    font-size: 1.25rem;
}
.item__botao {
    font-size: 1.25rem;
    border-radius: 50%;
    width: 2rem;
    height: 2rem;
    background-color: var(--azul);
    font-family: var(--fonte-principal);
    color: var(--branco);
    border: none;
    cursor: pointer;
    transition: 1s all;
}
.item__botao:disabled {
    cursor: not-allowed;
    background-color: var(--azul-claro);
}
.item__botao:active {
    transform: scale(1.2);
}
.item__remover {
    cursor: pointer;
    background-color: var(--vermelho);
    border: none;
    color: var(--branco);
    padding: 1rem;
    border-radius: 1rem;
    font-family: var(--fonte-principal);
    font-size: 1.125rem;
    display: inline-block;
}
</style>