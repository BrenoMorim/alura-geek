import { buscarProdutoPorId, buscarProdutos, buscarUsuarioPorEmail, cadastrarProduto, cadastrarUsuario, deletarProduto, postarMensagem, postarPedido } from '../http'
import { ADICIONAR_ITEM_CARRINHO, AUMENTAR_QUANTIDADE_ITEM, CADASTRAR_PRODUTO, CADASTRAR_USUARIO, DELETAR_PRODUTO, DIMINUIR_QUANTIDADE_ITEM, ENVIAR_MENSAGEM, ESVAZIAR_CARRINHO, FAZER_LOGIN, FAZER_LOGOUT, OBTER_PRODUTOS, OBTER_PRODUTO_POR_ID, REALIZAR_PEDIDO, REMOVER_ITEM_CARRINHO } from '../types/Actions';
import { DEFINIR_CARRINHO, DEFINIR_PRODUTOS, DEFINIR_PRODUTO_POR_ID, DEFINIR_USUARIO_LOGADO, DESLOGAR_USUARIO } from '../types/Mutations';
import IProduto from '../types/IProduto';
import IUsuario from '../types/IUsuario';
import { createStore } from 'vuex';
import { gerarHash, autenticarUsuario } from '../service/senhaService';
import IItem from '../types/IItem';
import IPedido from '../types/IPedido';

export default createStore({
  state: {
    produtos: [] as IProduto[],
    produtoDetalhado: {} as IProduto | undefined,
    usuarioLogado: {} as IUsuario | undefined,
    itensCarrinho: [] as IItem[]
  },
  getters: {
  },
  mutations: {
    [DEFINIR_PRODUTOS] (state, produtos: IProduto[]) {
      state.produtos = produtos;
    },
    [DEFINIR_PRODUTO_POR_ID] (state, produto: IProduto) {
      state.produtoDetalhado = produto;
    },
    [DEFINIR_USUARIO_LOGADO] (state, usuario: IUsuario) {
      state.usuarioLogado = usuario;
    },
    [DESLOGAR_USUARIO] (state) {
      state.usuarioLogado = undefined;
    },
    [DEFINIR_CARRINHO] (state, novoCarrinho: IItem[]) {
      state.itensCarrinho = novoCarrinho;
    }
  },
  actions: {
    async [OBTER_PRODUTOS] ({ commit }) {
      try {
        const produtos = await buscarProdutos();
        commit(DEFINIR_PRODUTOS, produtos);
      } catch(erro) {
        console.log(erro);
      }
    },
    // Define um produto a ser visto de forma detalhada,
    // a busca não é nem realizada se o id não for fornecido,
    // se o produto não for encontrado, o state é definido como
    // undefined para que a view possa tratar o erro para o cliente
    async [OBTER_PRODUTO_POR_ID] ({ commit }, id) {
      if (id === undefined) return;
      try {
        const produto = await buscarProdutoPorId(id);
        commit(DEFINIR_PRODUTO_POR_ID, produto);
      } catch(erro) {
        commit(DEFINIR_PRODUTO_POR_ID, undefined);
      }
    },
    // Tenta fazer login e retorna um booleano se conseguiu ou não realizar
    // Como não há uma api real, não há geração de token
    // O usuário é salvo diretamente no state
    async [FAZER_LOGIN] ({ commit }, dados: IUsuario) {
      try {
        if (await autenticarUsuario(dados)) {
          const usuario = await buscarUsuarioPorEmail(dados.email);
          commit(DEFINIR_USUARIO_LOGADO, {nome: usuario.nome, email: usuario.email, role: usuario.role});
          return true;
        }
        return false;
      } catch(erro) {
        console.log(erro);
        return false;
      }
    },
    [FAZER_LOGOUT] ({ commit }) {
      commit(DESLOGAR_USUARIO);
    },
    // Retorna se conseguiu cadastrar o usuário
    async [CADASTRAR_USUARIO] (_, usuario: IUsuario) {
      try {
        const senhaHash = gerarHash(usuario.senha);
        await cadastrarUsuario({id: usuario.email, nome: usuario.nome, role: 'usuario', email: usuario.email, senha: senhaHash});
        return true;
      } catch(erro) {
        return false;
      }
    },
    async [CADASTRAR_PRODUTO] (_, produto) {
      try {
        if (this.state.usuarioLogado?.role !== 'admin') return false;
        await cadastrarProduto(produto);
        return true;
      } catch(erro) {
        return false;
      }
    },
    async [DELETAR_PRODUTO] (_, id) {
      try {
        if (this.state.usuarioLogado?.role !== 'admin') return false;
        await deletarProduto(id);
        return true;
      } catch(erro) {
        return false;
      }
    },
    async [ENVIAR_MENSAGEM] (_, mensagem) {
      try {
        await postarMensagem(mensagem);
      } catch(erro) {
        console.log(erro);   
      }
    },
    async [ADICIONAR_ITEM_CARRINHO] ({ commit }, item: IItem) {
      
      const indiceNoCarrinho = this.state.itensCarrinho.findIndex(i => i.produto.id === item.produto.id);
      
      if (indiceNoCarrinho !== -1) {
        return false;
      }

      commit(DEFINIR_CARRINHO, [...this.state.itensCarrinho, item]);
      return true;
    },
    async [REMOVER_ITEM_CARRINHO] ({ commit }, item: IItem) {
      try {
        const novoCarrinho = this.state.itensCarrinho.filter(i => i.produto.id !== item.produto.id);
        commit(DEFINIR_CARRINHO, novoCarrinho);
        return true;
      } catch(erro) {
        console.log(erro);
        return false;
      }
    },
    async [AUMENTAR_QUANTIDADE_ITEM] (_, item: IItem) {
      const itemNoCarrinho = this.state.itensCarrinho.find(i => i.produto.id === item.produto.id);
      
      if (itemNoCarrinho === undefined) return;
      const novoItem = {quantidade: itemNoCarrinho.quantidade + 1, produto: itemNoCarrinho.produto};

      await this.dispatch(REMOVER_ITEM_CARRINHO, itemNoCarrinho);
      await this.dispatch(ADICIONAR_ITEM_CARRINHO, novoItem);
    },
    async [DIMINUIR_QUANTIDADE_ITEM] (_, item: IItem) {
      const itemNoCarrinho = this.state.itensCarrinho.find(i => i.produto.id === item.produto.id);
      
      if (itemNoCarrinho === undefined) return;
      const novoItem = {quantidade: itemNoCarrinho.quantidade - 1, produto: itemNoCarrinho.produto};
      await this.dispatch(REMOVER_ITEM_CARRINHO, itemNoCarrinho);
      await this.dispatch(ADICIONAR_ITEM_CARRINHO, novoItem);
    },
    [ESVAZIAR_CARRINHO] ({ commit }) {
      commit(DEFINIR_CARRINHO, []);
    },
    async [REALIZAR_PEDIDO] (_, pedido: IPedido) {
      await postarPedido(pedido);
    }
  },
  modules: {
  }
})
