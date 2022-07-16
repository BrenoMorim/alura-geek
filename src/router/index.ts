import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import NaoEncontradoView from '../views/NaoEncontradoView.vue';
import ProdutoDetalhadoView from '../views/ProdutoDetalhadoView.vue';
import CadastrarUsuarioView from '../views/CadastrarUsuarioView.vue';
import ProdutosView from '../views/ProdutosView.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/produtos/:id',
    name: 'produto-detalhado',
    component: ProdutoDetalhadoView
  },
  {
    path: '/cadastroUsuario',
    name: 'cadastro-usuario',
    component: CadastrarUsuarioView
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'nao-encontrado',
    component: NaoEncontradoView
  },
  {
    path: '/produtos',
    name: 'produtos',
    component: ProdutosView
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
