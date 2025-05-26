<template>
  <div class="container">
    <div class="dashboard-card">
      <h1>Tela do Agente de Segurança</h1>
      <p>Bem-vindo, {{ userName }}!</p>
      <p>Seu papel é: {{ userRole }}</p>
      <p>Funcionalidades específicas para Agentes de Segurança aqui.</p>
      <button @click="logoutUser" class="btn btn-logout">Sair</button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const userName = computed(() => store.getters['auth/currentUser']?.nome || 'Agente');
const userRole = computed(() => store.getters['auth/userRole']);

const logoutUser = () => {
  store.dispatch('auth/logout');
};
</script>

<style scoped>
.btn-logout {
  background-color: #e74c3c;
  margin-top: 20px;
}
.btn-logout:hover {
  background-color: #c0392b;
}
</style>