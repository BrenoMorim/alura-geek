import http from '@/http'
import { OBTER_PRODUTOS } from '@/types/Actions';
import IProduto from '@/types/IProduto';
import { DEFINIR_PRODUTOS } from '@/types/Mutations';
import { createStore } from 'vuex'

export default createStore({
  state: {
    produtos: [] as IProduto[]
  },
  getters: {
  },
  mutations: {
    [DEFINIR_PRODUTOS] (state, produtos: IProduto[]) {
      state.produtos = produtos;
    }
  },
  actions: {
    [OBTER_PRODUTOS] ({ commit }) {
      http.get('/produtos').then((res) => {
        commit(DEFINIR_PRODUTOS, res.data);
      })
    }
  },
  modules: {
  }
})
