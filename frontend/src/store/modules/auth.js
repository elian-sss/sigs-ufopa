// frontend/src/store/modules/auth.js
import authService from '../../services/authService'; // Será criado abaixo
import router from '../../router'; // Para redirecionamento

const state = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
};

const getters = {
  isAuthenticated: state => !!state.token,
  userRole: state => (state.user ? state.user.role : null),
  currentUser: state => state.user,
};

const actions = {
  async login({ commit }, credentials) {
    try {
      const { user, token } = await authService.login(credentials);
      commit('SET_USER', user);
      commit('SET_TOKEN', token);
      // Redirecionar com base no papel
      switch (user.role) {
        case 'admin':
          router.push('/admin');
          break;
        case 'agente_seguranca': // Certifique-se que o nome do papel é consistente
          router.push('/agente-seguranca');
          break;
        case 'usuario':
          router.push('/usuario');
          break;
        default:
          router.push('/login'); // Ou uma página padrão
      }
      return true;
    } catch (error) {
      console.error("Falha no login:", error);
      // Aqui você pode commitar uma mutação para um estado de erro, se desejar
      throw error; // Propagar o erro para o componente de login tratar
    }
  },
  logout({ commit }) {
    authService.logout(); // Limpa o localStorage no serviço
    commit('CLEAR_AUTH_DATA');
    router.push('/login');
  },
  // Ação para verificar se o usuário ainda está autenticado ao carregar a app (opcional)
  // checkAuth({ commit, state }) {
  //   if (state.token && state.user) {
  //     // Adicionar lógica para validar o token com o backend se necessário
  //     console.log('Usuário já autenticado:', state.user.role);
  //   } else {
  //     commit('CLEAR_AUTH_DATA');
  //   }
  // }
};

const mutations = {
  SET_USER(state, user) {
    state.user = user;
    localStorage.setItem('user', JSON.stringify(user));
  },
  SET_TOKEN(state, token) {
    state.token = token;
    localStorage.setItem('token', token);
  },
  CLEAR_AUTH_DATA(state) {
    state.user = null;
    state.token = null;
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  },
};

export default {
  namespaced: true, // importante para módulos
  state,
  getters,
  actions,
  mutations,
};