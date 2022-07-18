<template>
  <header class="cabecalho container">
    <div class="container">
      <LogoPadrao />
      <div class="container busca__container">
        <input v-model="busca" class="busca__campo" name="busca" type="search" placeholder="O que deseja encontrar?"/>
        <img class="busca__lupa" src="@/assets/icons/busca.svg" role="button" @click="buscar()" alt="Realizar a busca">
      </div>
    </div>
    <router-link v-if="usuarioLogado?.nome === undefined" :to="{name: 'login'}" class="cabecalho__botao">Login</router-link>
    <router-link v-if="usuarioLogado?.nome === undefined" :to="{name: 'cadastro-usuario'}" class="cabecalho__botao">Cadastre-se</router-link>
    <p v-if="usuarioLogado?.nome !== undefined">Bem-vindo, {{usuarioLogado.nome}}</p>
    <router-link v-if="usuarioLogado?.role === 'admin'" :to="{name: 'novo-produto'}" class="cabecalho__botao">Novo Produto</router-link>
    <button v-if="usuarioLogado?.nome !== undefined" @click="logout()" class="cabecalho__botao cabecalho__botao--logout">Logout</button>
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
        usuarioLogado: {} as IUsuario | undefined,
        busca: ''
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
      buscar() {
        this.$router.push({ name: "produtos", query: {busca: this.busca} });
      },
      logout() {
        store.dispatch(FAZER_LOGOUT);
        this.usuarioLogado = undefined;
        this.$router.push({name: 'home'});
      }
    }
})
</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
}
.cabecalho {
  column-gap: 1.5rem;
  justify-content: space-between;
  padding: 2rem 8rem;
}
.cabecalho__botao {
  border: 2px solid var(--azul);
  color: var(--azul);
  text-decoration: none;
  font-weight: 400;
  font-size: 1rem;
  padding: 1rem 2rem;
}
.cabecalho__botao--logout {
  cursor: pointer;
  background-color: var(--branco);
}
.busca__container {
  background-color: var(--cinza-claro);
  width: 30vw;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  margin-left: 1rem;
  margin-right: 1rem;
  padding: .5rem .75rem;
  color: var(--cinza);
}
.busca__lupa {
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;
  background-color: var(--cinza);
  padding: .5rem;
  border-radius: 50%;
}
.busca__campo {
  width: 100%;
}
</style>