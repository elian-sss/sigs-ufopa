<template>
  <div class="container">
    <div class="card">
      <h1 class="card-title">LOGIN</h1>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="codUfopaCpf">COD SIGS OU CPF</label>
          <input id="codUfopaCpf" type="text" v-model="codUfopaCpf" required placeholder="Seu código ou CPF">
        </div>
        <div class="form-group">
          <label for="senha">SENHA</label>
          <input id="senha" type="password" v-model="senha" required placeholder="Sua senha">
        </div>
        <button type="submit" class="btn" :disabled="loading">
          {{ loading ? 'ENTRANDO...' : 'ENTRAR' }}
        </button>
      </form>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router'; // useRouter para navegação, useRoute para query params

const store = useStore();
const router = useRouter();
const route = useRoute(); // Para pegar o parâmetro redirect, se houver

const codUfopaCpf = ref('');
const senha = ref('');
const loading = ref(false);
const errorMessage = ref('');

const handleLogin = async () => {
  loading.value = true;
  errorMessage.value = '';
  try {
    await store.dispatch('auth/login', {
      codUfopaCpf: codUfopaCpf.value,
      password: senha.value, // O serviço de auth espera 'password'
    });
    // O redirecionamento é feito dentro da action 'auth/login' no store
    // Mas podemos verificar se há um 'redirect' query param
    const redirectPath = route.query.redirect || getDefaultPathForRole(store.getters['auth/userRole']);
    router.push(redirectPath);

  } catch (error) {
    errorMessage.value = error.message || 'Falha ao tentar fazer login. Verifique suas credenciais.';
  } finally {
    loading.value = false;
  }
};

const getDefaultPathForRole = (role) => {
  switch (role) {
    case 'admin': return '/admin';
    case 'agente_seguranca': return '/agente-seguranca';
    case 'usuario': return '/usuario';
    default: return '/login';
  }
}
</script>

<style scoped>
/* Estilos específicos do LoginView podem ir aqui,
   mas muitos já estão no main.css e no card global */
.container {
  background-color: #2c3e50; /* Fundo mais escuro para a página de login, como na imagem */
}
.card {
  background-color: #ecf0f1; /* Fundo claro para o formulário */
}
.card-title {
  color: #34495e;
}
.error-message {
  color: red;
  margin-top: 15px;
}
</style>