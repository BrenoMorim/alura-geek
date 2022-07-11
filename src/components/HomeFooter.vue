<template>
  <footer class="footer">
    <div class="coluna">
        <img src="@/assets/Logo.png" alt="Logo da Alura Geek">
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
            <button type="submit" class="botao">Enviar Mensagem</button> 
        </form>
    </div>
  </footer>
  <div class="info-desenvolvedor">
    <h2>Desenvolvido por Breno Morim<br>2022</h2>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent ({
    name: 'HomeFooter'
})
</script>

<style scoped>
.footer {
    display: flex;
    align-items: flex-start;
    justify-content: space-around;
    background-color: var(--azul-claro);
    padding: 2rem 8rem;
}
.link {
    text-decoration: none;
    color: var(--cinza-escuro);
    font-weight: 500;
}
.lista-links > li {
    margin-bottom: 1.25rem;
}
.formulario {
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
}
.formulario__titulo {
    color: var(--cinza-escuro);
    font-weight: 700;
    font-size: 18px;
}
.formulario__campo {
    color: var(--cinza-escuro);
    background-color: var(--branco);
    border-bottom: 1px solid var(--cinza-escuro);
    padding: 1rem;
    width: 30vw;
}
.botao {
    color: var(--branco);
    background-color: var(--azul);
    padding: .75rem 1rem;
    display: inline-block;
    width: fit-content;
    font-size: 1.2rem;
    font-weight: 100;
}
.info-desenvolvedor {
    text-align: center;
    color: var(--cinza-escuro);
    font-size: 18px;
    font-weight: 300;
    line-height: 1.75rem;
    margin: 2rem 0;
}
</style>