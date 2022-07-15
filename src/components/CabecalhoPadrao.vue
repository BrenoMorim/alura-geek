<template>
  <header class="cabecalho container">
    <div class="container">
      <LogoPadrao />
      <input class="busca" name="busca" type="search" placeholder="O que deseja encontrar? "/>
    </div>
    <router-link v-if="usuarioLogado?.nome === undefined" to="/login" class="cabecalho__botao">Login</router-link>
    <p v-if="usuarioLogado?.nome !== undefined">Bem-vindo, {{usuarioLogado.nome}}</p>
    <button v-if="usuarioLogado?.nome !== undefined" @click="logout()" class="cabecalho__botao">Logout</button>
  </header>
</template>

<script lang="ts">
import store from "@/store";
import { FAZER_LOGOUT } from "@/types/Actions";
import IUsuario from "@/types/IUsuario";
import { defineComponent } from "@vue/runtime-core";
import LogoPadrao from "./LogoPadrao.vue";

export default defineComponent({
    name: 'CabecalhoPadrao',
    components: {
      LogoPadrao
    },
    data() {
      return {
        usuarioLogado: {} as IUsuario | undefined
      }
    },
    created() {
      this.usuarioLogado = store.state.usuarioLogado;
      this.$watch(() => store.state.usuarioLogado,
        () => {
          this.usuarioLogado = store.state.usuarioLogado
        }
      );
    },
    methods: {
      logout() {
        store.dispatch(FAZER_LOGOUT);
        this.usuarioLogado = undefined;
      }
    }
})
</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
  column-gap: 1.5rem;
}
.cabecalho {
  justify-content: space-between;
  padding: 2rem 8rem;
}
.cabecalho__botao {
  border: 2px solid var(--azul);
  color: var(--azul);
  text-decoration: none;
  font-weight: 400;
  font-size: 16px;
  padding: 1rem 5rem;
}
.busca {
  background-color: var(--cinza-claro);
  padding: .75rem;
  width: 30vw;
  border-radius: 10px;
  background-image: url('@/assets/icons/busca.svg');
  background-repeat: no-repeat;
  background-position: right;
  color: var(--cinza);
}
</style>