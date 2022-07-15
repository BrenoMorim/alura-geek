<template>
  <form class="formulario pagina-formulario" @submit.prevent="fazerLogin()">
    <h3 class="formulario__titulo formulario__titulo--maior ">Iniciar Sessão</h3>
    <input v-model="usuario.email" name="email" type="email" class="formulario__campo formulario__campo--maior" placeholder="Digite seu email" required>
    <input v-model="usuario.senha" type="password" name="senha" class="formulario__campo formulario__campo--maior" placeholder="Digite sua senha" required>
    <button class="formulario__botao formulario__botao--maior" type="submit">Entrar</button>
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
</style>