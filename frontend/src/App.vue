<template>
  <div id="app-container">
    <router-view />
  </div>
</template>

<script setup>
// Nenhuma lógica específica aqui para uma casca simples de router-view
</script>

<style scoped>
#app-container {
  /* Estilos para o container principal da aplicação, se necessário.
     Muitos estilos globais já estão em assets/main.css */
  width: 100%;
  min-height: 100vh; /* Garante que o container ocupe toda a altura */
}
</style>