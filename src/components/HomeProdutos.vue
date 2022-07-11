<template>
  <section class="produtos">    
    <div id="star-wars">
        <div class="produtos__cabecalho">
            <h3 class="produtos__titulo">Star Wars</h3>
            <a href="" class="produtos__link">Ver tudo ➜</a>
        </div>
        <div class="lista__produtos">
            <article class="produto__card">
                <img class="produto__imagem" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaXfQbnlGDSdI9l_vihb3KoWxqwrTa-rxFag&usqp=CAU" alt="Imagem do produto">
                <p class="produto__nome">Copo Star Wars</p>
                <p class="produto__preco">R$ 20,00</p>
                <a href="" class="produto__link">Ver produto</a>
            </article>
            <article class="produto__card">
                <img class="produto__imagem" src="https://www.hypeness.com.br/1/2015/12/produtoStarWars9.jpg" alt="Imagem do produto">
                <p class="produto__nome">Headset</p>
                <p class="produto__preco">R$ 80,00</p>
                <a href="" class="produto__link">Ver produto</a>
            </article>
            <article class="produto__card">
                <img class="produto__imagem" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRi9trd9m_dc0S7NmNS-02YmZtjkwholfSuZg&usqp=CAU" alt="Imagem do produto">
                <p class="produto__nome">Chaveiro Darth Vader</p>
                <p class="produto__preco">R$ 15,00</p>
                <a href="" class="produto__link">Ver produto</a>
            </article>
            <article class="produto__card">
                <img class="produto__imagem" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxQmXj3H4A0wFEHGqWsNnX4rycMr2ZaHJwdw&usqp=CAU" alt="Imagem do produto">
                <p class="produto__nome">Bonecos de crochê</p>
                <p class="produto__preco">R$ 40,00</p>
                <a href="" class="produto__link">Ver produto</a>
            </article>
        </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
    name: 'HomeProdutos'
})
</script>

<style scoped>
.produtos {
    padding: 2rem 8rem;
}
.produtos__cabecalho {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
}
.lista__produtos {
    display: flex;
    align-items: center;
}
.produtos__titulo {
    color: var(--cinza-escuro);
    font-size: 3rem;
}
.produtos__link {
    color: var(--azul);
    font-size: 1rem;
    text-decoration: none;
    font-weight: 700;
}
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