<template>
  <form class="formulario pagina-formulario" @submit.prevent="enviarFormulario()">
    <h3 class="formulario__titulo formulario__titulo--maior">Realizar Cadastro</h3>
    <div>
        <label for="nome" class="formulario__label">Nome:</label>
        <input v-model="usuario.nome" id="nome" name="nome" type="text" class="formulario__campo formulario__campo--maior" placeholder="Digite seu nome" required>
    </div>
    <div>
        <label for="email" class="formulario__label">Email:</label>
        <input v-model="usuario.email" id="email" name="email" type="email" class="formulario__campo formulario__campo--maior" placeholder="Digite seu email" required>
    </div>
    <div>
        <label for="senha" class="formulario__label">Senha:</label>
        <input v-model="usuario.senha" id="senha" type="password" name="senha" class="formulario__campo formulario__campo--maior" placeholder="Digite sua senha" required>
        <input v-model="usuario.confirmarSenha" type="password" name="confirmarSenha" class="formulario__campo formulario__campo--maior" placeholder="Confirme a senha" required>
    </div>
    <button class="formulario__botao formulario__botao--maior" type="submit">Enviar dados</button>
    <p v-for="(mensagemDeErro, index) in mensagensDeErro" :key="index" class="mensagem-erro">{{mensagemDeErro}}</p>
  </form>
</template>

<script lang="ts">
import store from "../store";
import { CADASTRAR_USUARIO } from "../types/Actions";
import IUsuario from "../types/IUsuario";
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
    name: 'CadastrarUsuarioView',
    data() {
      return {
        usuario: { nome: "", email: "", senha: "", confirmarSenha: ""},
        mensagensDeErro: [] as string[]
      }
    },
    methods: {
        async enviarFormulario() {
            this.mensagensDeErro = [];
            const formularioValido = this.validarFormulario();
            if (!formularioValido) return;

            const dadosASeremCadastrados = {
                id: this.usuario.email,
                nome: this.usuario.nome,
                email: this.usuario.email,
                senha: this.usuario.senha,
                role: 'usuario'
            } as IUsuario;

            const conseguiuCadastrar = await store.dispatch(CADASTRAR_USUARIO, dadosASeremCadastrados);
            if (!conseguiuCadastrar) {
                this.mensagensDeErro.push('Já existe um usuário cadastrado com esse email!');
                return;
            }
            this.$router.push({ name: 'login' });
        },
        validarFormulario(): boolean {
            let valido = true;
            if(this.usuario.nome.length < 5 || this.usuario.nome.length > 30) {
                valido = false;
                this.mensagensDeErro.push('O nome deve conter entre 5 e 30 caracteres');
            }
            if (this.usuario.senha.length < 7 || this.usuario.senha.length > 30) {
                valido = false;
                this.mensagensDeErro.push('A senha deve conter entre 7 e 30 caracteres');
            }
            if (this.usuario.senha !== this.usuario.confirmarSenha) {
                valido = false;
                this.mensagensDeErro.push('As senhas não coincidem');
            }
            return valido;
        }
    }
})
</script>

<style scoped>
@import url('@/assets/css/formulario.css');
</style>