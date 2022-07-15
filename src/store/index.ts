import http from '@/http'
import { OBTER_PRODUTOS, OBTER_PRODUTO_POR_ID } from '@/types/Actions';
import IProduto from '@/types/IProduto';
import { DEFINIR_PRODUTOS, DEFINIR_PRODUTO_POR_ID } from '@/types/Mutations';
import { createStore } from 'vuex'

export default createStore({
  state: {
    produtos: [] as IProduto[],
    produtoDetalhado: {} as IProduto | undefined
  },
  getters: {
  },
  mutations: {
    [DEFINIR_PRODUTOS] (state, produtos: IProduto[]) {
      state.produtos = produtos;
    },
    [DEFINIR_PRODUTO_POR_ID] (state, produto: IProduto) {
      state.produtoDetalhado = produto;
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
    }
  },
  modules: {
  }
})
