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
        <form action="" class="formulario">
            <h3 class="formulario__titulo">Fale conosco</h3>
            <input class="formulario__campo" placeholder="Nome" type="text" id="nome" name="nome" required>
            <textarea class="formulario__campo" placeholder="Escreva sua mensagem" name="mensagem" id="mensagem" cols="30" rows="3" required></textarea>
            <button type="submit" class="formulario__botao">Enviar Mensagem</button> 
        </form>
    </div>
  </footer>
  <div class="info-desenvolvedor">
    <h2>Desenvolvido por Breno Morim<br>2022</h2>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import LogoPadrao from "./LogoPadrao.vue";

export default defineComponent ({
    name: "FooterPadrao",
    components: { LogoPadrao }
})
</script>

<style scoped>
@import url("@/assets/css/formulario.css");
.footer {
    display: flex;
    align-items: flex-start;
    justify-content: space-around;
    background-color: var(--azul-claro);
    padding: 2rem 8rem;
    font-family: var(--fonte-principal);
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