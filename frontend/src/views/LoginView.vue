<template>
  <div class="container">
    <div class="card">
      <h1 class="card-title">LOGIN</h1>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">EMAIL</label>
          <input id="email" type="text" v-model="email" required placeholder="Seu email">
        </div>
        <div class="form-group">
          <label for="password">SENHA</label>
          <input id="password" type="password" v-model="password" required placeholder="Sua senha">
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
import {ref} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import {login} from '@/api/auth';
import jwt_decode from 'jwt-decode';

const router = useRouter();
const route = useRoute();

const email = ref('');
const password = ref('');
const loading = ref(false);
const errorMessage = ref('');

const handleLogin = async () => {
  loading.value = true;
  errorMessage.value = '';
  try {
    const data = await login(email.value, password.value);
    console.log(data)
    localStorage.setItem('token', data.accessToken);
    const decoded = jwt_decode(data.accessToken);
    console.log(decoded)

    const redirectPath = route.query.redirect || getDefaultPathForRole(data.role);
    router.push(redirectPath);
  } catch (error) {
    errorMessage.value = error?.response?.data?.message || error.message || 'Falha ao tentar fazer login. Verifique suas credenciais.';
  } finally {
    loading.value = false;
  }
};

const getDefaultPathForRole = (role) => {
  switch (role) {
    case 'admin':
      return '/admin';
    case 'agente_seguranca':
      return '/agente-seguranca';
    case 'usuario':
      return '/usuario';
    default:
      return '/login';
  }
}
</script>

<style scoped>
.container {
  background-color: #2c3e50;
}

.card {
  background-color: #ecf0f1;
}

.card-title {
  color: #34495e;
}

.error-message {
  color: red;
  margin-top: 15px;
}
</style>