<template>
  <form class="formulario formulario__login" @submit.prevent="fazerLogin()">
    <h3 class="formulario__titulo login__titulo">Iniciar Sessão</h3>
    <input v-model="usuario.email" name="email" type="email" class="formulario__campo login__campo" placeholder="Digite seu email" required>
    <input v-model="usuario.senha" type="password" name="senha" class="formulario__campo login__campo" placeholder="Digite sua senha" required>
    <button class="formulario__botao login__botao" type="submit">Entrar</button>
    <p v-if="mensagemDeErro" class="mensagem-erro">{{mensagemDeErro}}</p>
  </form>
</template>

<script lang="ts">
import store from "@/store";
import { FAZER_LOGIN } from "@/types/Actions";
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
    name: 'LoginView',
    data() {
      return {
        usuario: { email: "", senha: ""},
        mensagemDeErro: ''
      }
    },
    methods: {
      async fazerLogin() {
          const loginRealizado = await store.dispatch(FAZER_LOGIN, this.usuario);
          if (loginRealizado) {
            this.$router.push({ name: 'home'});
            this.mensagemDeErro = "";
            return;
          }
          this.mensagemDeErro = "Email ou senha inválidos!";
      }
    }
})
</script>

<style scoped>
@import url('@/assets/css/formulario.css');

.formulario__login {
  padding: 4rem 8rem;
  text-align: center;
  margin: 0 auto;
  max-width: 100vw;
  height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--cinza-claro);
}
.login__botao, .login__campo {
  box-sizing: border-box;
  width: 35vw;
  margin-top: .5rem; 
}
.login__titulo {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}
</style>