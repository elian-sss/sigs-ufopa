// frontend/src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import store from '../store';

// Importe suas views
import LoginView from '../views/LoginView.vue';
import UsuarioView from '../views/UsuarioView.vue';
import AgenteSegurancaView from '../views/AgenteSegurancaView.vue';
import AdminView from '../views/AdminView.vue';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
    meta: { requiresGuest: true } // Para redirecionar se já estiver logado
  },
  {
    path: '/usuario',
    name: 'Usuario',
    component: UsuarioView,
    meta: { requiresAuth: true, roles: ['usuario', 'admin'] }
  },
  {
    path: '/agente-seguranca',
    name: 'AgenteSeguranca',
    component: AgenteSegurancaView,
    meta: { requiresAuth: true, roles: ['agente_seguranca', 'admin'] }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: AdminView,
    meta: { requiresAuth: true, roles: ['admin'] }
  },
  // Redirecionamento para login se a rota não for encontrada ou rota inicial
  { path: '/:catchAll(.*)', redirect: '/login' },
  { path: '/', redirect: () => {
      return store.getters['auth/isAuthenticated'] ? (store.getters['auth/userRole'] === 'admin' ? '/admin' : (store.getters['auth/userRole'] === 'agente_seguranca' ? '/agente-seguranca' : '/usuario')) : '/login';
    }
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL || '/'),
  routes,
});

// router.beforeEach((to, from, next) => {
//   const isAuthenticated = store.getters['auth/isAuthenticated'];
//   const userRole = store.getters['auth/userRole'];
//
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     if (!isAuthenticated) {
//       next({ name: 'Login', query: { redirect: to.fullPath } }); // Salva a rota que o usuário tentou acessar
//     } else {
//       const requiredRoles = to.meta.roles;
//       if (requiredRoles && !requiredRoles.includes(userRole)) {
//         // O usuário está logado, mas não tem o papel necessário
//         // Redirecionar para uma página de "acesso negado" ou para a home do seu papel
//         alert('Acesso Negado!'); // Simplista
//         // Poderia ser next({ name: 'PaginaDeErroAcesso' }) ou next(from) ou next('/')
//         // Ou redirecionar para a página principal do usuário
//         if (userRole === 'admin') next({ name: 'Admin' });
//         else if (userRole === 'agente_seguranca') next({ name: 'AgenteSeguranca' });
//         else if (userRole === 'usuario') next({ name: 'Usuario' });
//         else next({ name: 'Login' }); // Fallback
//       } else {
//         next(); // Prossiga
//       }
//     }
//   } else if (to.matched.some(record => record.meta.requiresGuest)) {
//     if (isAuthenticated) {
//       // Se a rota requer convidado (ex: login) e o usuário está logado, redireciona
//       if (userRole === 'admin') next({ name: 'Admin' });
//       else if (userRole === 'agente_seguranca') next({ name: 'AgenteSeguranca' });
//       else if (userRole === 'usuario') next({ name: 'Usuario' });
//       else next('/'); // Fallback
//     } else {
//       next();
//     }
//   }
//   else {
//     next(); // Rotas públicas
//   }
// });

export default router;