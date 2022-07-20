<template>
  <footer class="footer">
    <div class="coluna">
        <LogoPadrao/>
    </div>
    <div class="coluna">
        <ul class="lista-links">
            <li><a href="#" class="link">Quem somos nós</a></li>
            <li><a href="#" class="link">Política de privacidade</a></li>
            <li><a href="#" class="link">Programa fidelidade</a></li>
            <li><a href="#" class="link">Nossas lojas</a></li>
            <li><a href="#" class="link">Quero ser franqueado</a></li>
            <li><a href="#" class="link">Anuncie aqui</a></li>
        </ul>
    </div>
    <div class="coluna">
        <form @submit.prevent="enviarMensagem" class="formulario">
            <h3 class="formulario__titulo">Fale conosco</h3>
            <input class="formulario__campo" placeholder="Nome" type="text" id="nome" name="nome" v-model="nome" required>
            <textarea class="formulario__campo" placeholder="Escreva sua mensagem" name="mensagem" id="mensagem" v-model="mensagem" cols="30" rows="3" required></textarea>
            <p v-if="mensagemSucesso" class="mensagem-sucesso">{{mensagemSucesso}}</p>
            <p v-if="mensagemErro" class="mensagem-erro">{{mensagemErro}}</p>
            <button type="submit" class="formulario__botao">Enviar Mensagem</button> 
        </form>
    </div>
  </footer>
  <div class="info-desenvolvedor">
    <h2>Desenvolvido por Breno Morim<br>2022</h2>
  </div>
</template>

<script lang="ts">
import store from "@/store";
import { ENVIAR_MENSAGEM } from "@/types/Actions";
import { defineComponent } from "@vue/runtime-core";
import LogoPadrao from "./LogoPadrao.vue";

export default defineComponent ({
    name: "FooterPadrao",
    components: { LogoPadrao },
    data() {
        return {
            nome: '',
            mensagem: '',
            mensagemSucesso: '',
            mensagemErro: ''
        }
    },
    methods: {
        async enviarMensagem() {
            this.mensagemSucesso = '';
            this.mensagemErro = '';
            if (this.nome.length < 5 || this.mensagem.length < 10) {
                this.mensagemErro = 'Nome ou mensagem muito curtas!';
                return;
            }
            await store.dispatch(ENVIAR_MENSAGEM, {nome: this.nome, mensagem: this.mensagem});
            this.mensagemSucesso = 'Mensagem enviada com sucesso';
            this.nome = '';
            this.mensagem = '';
        }
    }
});
</script>

<style scoped>
@import url("@/assets/css/formulario.css");
.footer {
    display: flex;
    align-items: flex-start;
    justify-content: space-around;
    background-color: var(--azul-claro);
    padding: var(--padding-pagina);
    font-family: var(--fonte-principal);
}
@media screen and (max-width: 768px) {
    .footer {
        flex-direction: column;
        align-items: center;
        text-align: center;
        row-gap: 1rem;
    }
}
.link {
    text-decoration: none;
    color: var(--cinza-escuro);
    font-weight: 700;
}
.lista-links > li {
    margin-bottom: 1.25rem;
}
.info-desenvolvedor {
    text-align: center;
    color: var(--cinza-escuro);
    font-size: 18px;
    font-weight: 400;
    line-height: 1.75rem;
    margin: 2rem 0;
    font-family: var(--fonte-principal);
}
</style>