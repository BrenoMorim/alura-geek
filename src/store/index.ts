import http from '@/http'
import { CADASTRAR_USUARIO, FAZER_LOGIN, FAZER_LOGOUT, OBTER_PRODUTOS, OBTER_PRODUTO_POR_ID } from '@/types/Actions';
import { DEFINIR_PRODUTOS, DEFINIR_PRODUTO_POR_ID, DEFINIR_USUARIO_LOGADO, DESLOGAR_USUARIO } from '@/types/Mutations';
import IProduto from '@/types/IProduto';
import IUsuario from '@/types/IUsuario';
import { createStore } from 'vuex';

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
        const resposta = await http.get('/produtos');
        commit(DEFINIR_PRODUTOS, resposta.data);
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
        const resposta = await http.get(`/produtos/${id}`);
        commit(DEFINIR_PRODUTO_POR_ID, resposta.data);
      } catch(erro) {
        commit(DEFINIR_PRODUTO_POR_ID, undefined);
        console.log(erro);
      }
    },
    // Tenta fazer login e retorna um booleano se conseguiu ou não realizar
    // Como não há uma api real, não há geração de token e o usuário é salvo diretamente no state
    async [FAZER_LOGIN] ({ commit }, dados: IUsuario) {
      try {
        const res = await http.get(`/usuarios?email=${dados.email}`);
        const usuario = res.data.at(0) as IUsuario;
        
        if (usuario.senha === dados.senha) {
          commit(DEFINIR_USUARIO_LOGADO, usuario);
          return true;
        }
        return false;
      } catch(erro) {
        return false;
      }
    },
    [FAZER_LOGOUT] ({ commit }) {
      commit(DESLOGAR_USUARIO);
    },
    // Retorna se conseguiu cadastrar o usuário
    async [CADASTRAR_USUARIO] (_, usuario) {
      try {
        // Verifica se já existe um usuário cadastrado com esse email
        const res = await http.get(`/usuarios?email=${usuario.email}`);
        const usuariosCadastradosComEmail = res.data as IUsuario[];
        if (usuariosCadastradosComEmail.length > 0) {
          return false;
        }
        await http.post('/usuarios', usuario);
        return true
      } catch(erro) {
        return false;
      }
    }
  },
  modules: {
  }
})
