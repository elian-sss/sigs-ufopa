// frontend/src/store/index.js
import { createStore } from 'vuex';
import auth from './modules/auth'; // Importando o módulo de autenticação

export default createStore({
  modules: {
    auth, // Registrando o módulo
  },
});