<template>
  <header class="cabecalho container">
    <LogoPadrao />
    <div class="container busca__container">
      <input v-model="busca" class="busca__campo" name="busca" type="search" placeholder="O que deseja encontrar?"/>
      <img class="busca__lupa" src="../assets/icons/busca.svg" role="button" @click="buscar()" alt="Realizar a busca">
    </div>
    <router-link v-if="usuarioLogado?.nome === undefined" :to="{name: 'login'}" id="login" class="cabecalho__botao">Login</router-link>
    <router-link v-if="usuarioLogado?.nome === undefined" :to="{name: 'cadastro-usuario'}" id="cadastro" class="cabecalho__botao">Cadastre-se</router-link>
    <p v-if="usuarioLogado?.nome !== undefined" class="mensagem-boas-vindas">Bem-vindo, {{usuarioLogado.nome}}</p>
    <router-link v-if="usuarioLogado?.role === 'admin'" :to="{name: 'novo-produto'}" id="novo-produto" class="cabecalho__botao">Novo Produto</router-link>
    <button v-if="usuarioLogado?.nome !== undefined" @click="logout()" id="logout" class="cabecalho__botao">Logout</button>
    <router-link v-if="usuarioLogado?.nome !== undefined" :to="{name: 'carrinho'}" id="carrinho" class="cabecalho__botao">Carrinho</router-link>
    
  </header>
</template>

<script lang="ts">
import store from "../store";
import { FAZER_LOGOUT } from "../types/Actions";
import IUsuario from "../types/IUsuario";
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
  justify-content: space-between;
  padding: var(--padding-pagina);
  flex-wrap: wrap;
}
.cabecalho__botao {
  border: 2px solid var(--azul);
  color: var(--azul);
  text-decoration: none;
  font-weight: 400;
  font-size: 0.9rem;
  padding: 1rem;
  cursor: pointer;
  background-color: var(--branco);
  transition: 1s all;
}
.cabecalho__botao:active {
  transform: scale(1.2);
}
.busca__container {
  background-color: var(--cinza-claro);
  width: 30vw;
  min-width: 240px;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  margin-left: .5rem;
  margin-right: .5rem;
  padding: .5rem .75rem;
  color: var(--cinza);
}
.busca__campo::placeholder {
  font-size: .9rem;
}
.busca__lupa {
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;
  background-color: var(--cinza);
  padding: .5rem;
  border-radius: 50%;
  transition: 1s all; 
}
.busca__lupa:active {
  transform: scale(1.2);
}
 .busca__campo {
  width: 100%;
}
@media screen and (max-width: 768px) {
  .cabecalho {
    row-gap: 1rem;
    justify-content: center;
  }
  .cabecalho__botao {
    margin: .5rem;
  }
}
@media screen and (min-width: 1240px) {
  .cabecalho__botao {
    font-size: 1rem;
    padding: 1rem 2rem;
  }
}
</style>