import { buscarProdutoPorId, buscarProdutos, buscarUsuarioPorEmail, cadastrarProduto, cadastrarUsuario, deletarProduto, postarMensagem } from '../http'
import { CADASTRAR_PRODUTO, CADASTRAR_USUARIO, DELETAR_PRODUTO, ENVIAR_MENSAGEM, FAZER_LOGIN, FAZER_LOGOUT, OBTER_PRODUTOS, OBTER_PRODUTO_POR_ID } from '../types/Actions';
import { DEFINIR_PRODUTOS, DEFINIR_PRODUTO_POR_ID, DEFINIR_USUARIO_LOGADO, DESLOGAR_USUARIO } from '../types/Mutations';
import IProduto from '../types/IProduto';
import IUsuario from '../types/IUsuario';
import { createStore } from 'vuex';
import { gerarHash, autenticarUsuario } from '../service/senhaService';

export default createStore({
  state: {
    produtos: [] as IProduto[],
    produtoDetalhado: {} as IProduto | undefined,
    usuarioLogado: {} as IUsuario | undefined
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
        return true
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
    }
  },
  modules: {
  }
})
