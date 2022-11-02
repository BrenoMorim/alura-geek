<template>
    <section class="carrinho">
        <h2 class="carrinho__titulo">Seu Carrinho</h2>
        <div class="carrinho__itens">
            <Item 
                v-for="(item, index) in itensCarrinho"
                :key="index"
                :produto="item.produto"
                :quantidade="item.quantidade"
            />
        </div>
        
        <h3 v-if="itensCarrinho.length === 0" class="carrinho__subtitulo">Seu carrinho está vazio!</h3>
        
        <router-link :to="{name: 'produtos'}" id="navegar" class="carrinho__botao">{{ itensCarrinho.length === 0 ? 'Que tal navegar entre nossa variedade de produtos?' : 'Adicionar mais produtos'}}</router-link>
        
        <p v-if="mensagemErro" class="mensagem-erro">{{mensagemErro}}</p>
        <p v-if="mensagemSucesso" class="mensagem-sucesso">{{mensagemSucesso}}</p>
        
        <h4 v-if="valorTotal > 0" class="carrinho__valor-total">Valor total do pedido: R$ {{valorTotal.toFixed(2).replace('.', ',')}}</h4>
        <button v-if="itensCarrinho.length > 0" id="finalizar" class="carrinho__botao" @click="finalizarCompra()">Finalizar compra</button>
    </section>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import Item from '../components/Carrinho/Item.vue';
import IUsuario from "../types/IUsuario";
import IItem from "../types/IItem";
import store from "../store";
import { ESVAZIAR_CARRINHO, REALIZAR_PEDIDO } from "../types/Actions";
import IPedido from "../types/IPedido";

export default defineComponent({
    name: 'CarrinhoView',
    data() {
        return {
            usuarioLogado: {} as IUsuario | undefined,
            mensagemErro: '',
            mensagemSucesso: '',
            itensCarrinho: [] as IItem[],
            valorTotal: 0
        }
    },
    components: {
        Item
    },
    created() {
        this.usuarioLogado = store.state.usuarioLogado;
        this.itensCarrinho = store.state.itensCarrinho;
        this.valorTotal = this.calculaValorTotal();

        this.$watch(() => store.state.itensCarrinho, () => {
            this.itensCarrinho = store.state.itensCarrinho;
            this.valorTotal = this.calculaValorTotal();
        });

        this.$watch(() => store.state.usuarioLogado, () => {
            this.usuarioLogado = store.state.usuarioLogado;
        });
    },
    methods: {
        finalizarCompra() {
            if (!this.usuarioLogado?.email) {
                this.mostrarMensagem('Você deve estar logado para poder finalizar o pedido, se já tiver uma conta realize login ou então se cadastre!', 'erro')
                return;
            }
            try {
                const itensPedido = this.itensCarrinho.map(item => {
                    return {
                        produtoId: item.produto.id, 
                        quantidade: item.quantidade
                    }
                });
                store.dispatch(REALIZAR_PEDIDO, {
                    itens: itensPedido,
                    emailUsuario: this.usuarioLogado?.email,
                    valorTotal: this.valorTotal
                } as IPedido);

                store.dispatch(ESVAZIAR_CARRINHO);

                this.mostrarMensagem('O pedido foi feito com sucesso! Obrigado pela preferência =) Assim que confirmarmos seu pedido entraremos em contato no seu email para coletar os dados de entrega e pagamento!', 'sucesso');                
            } catch(erro) {
                this.mostrarMensagem('Aconteceu um erro inesperado e não foi possível concluir o pedido =(', 'erro');
            }
        },
        calculaValorTotal() {
            let soma = 0;
            this.itensCarrinho.forEach(item => {
                soma += (item.produto.preco * item.quantidade);
            });
            return soma;
        },
        mostrarMensagem(mensagem: string, tipo: string) {
            if (tipo === 'sucesso') {
                this.mensagemSucesso = mensagem;
                setTimeout(() => {
                    this.mensagemSucesso = '';
                }, 5000);
            } else if (tipo === 'erro') {
                this.mensagemErro = mensagem;
                setTimeout(() => {
                    this.mensagemErro = '';
                }, 5000);
            }
        }
    }
});
</script>

<style scoped>
@import url('../assets/css/formulario.css');
.carrinho {
    padding: var(--padding-pagina);
    color: var(--cinza-escuro);
}
.carrinho__titulo {
    font-size: 3.5rem;
    font-weight: 600;
    margin: 1rem 0;
}
.carrinho__botao {
    padding: 1.25rem;
    font-size: 1.25rem;
    color: var(--branco);
    background-color: var(--azul);
    font-family: var(--fonte-principal);
    border: none;
    border-radius: 1rem;
    margin: 1rem 0;
    cursor: pointer;
    transition: 1s all;
    display: inline-block;
    text-decoration: none;
    text-align: center;
    line-height: 1.4rem;
}
.carrinho__botao:active {
    transform: scale(1.2);
}
.carrinho__valor-total {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 1.25rem 0 .5rem;
}
.carrinho__subtitulo {
    font-size: 2rem;
    margin: 3rem 0 1rem;
    color: var(--vermelho);
}
</style>
