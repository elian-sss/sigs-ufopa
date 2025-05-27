// frontend/src/services/authService.js

// Simulação de uma chamada de API
const MOCK_API_DELAY = 1000; // 1 segundo

// Usuários mockados para simulação (substitua pela chamada real à API)
const mockUsers = {
  "admin123": { password: "password", user: { id: 1, nome: "Admin User", codUfopaCpf: "admin123", role: "admin" }, token: "fake-admin-token" },
  "agente007": { password: "password", user: { id: 2, nome: "Agente S.", codUfopaCpf: "agente007", role: "agente_seguranca" }, token: "fake-agente-token" },
  "user101": { password: "password", user: { id: 3, nome: "Usuário Comum", codUfopaCpf: "user101", role: "usuario" }, token: "fake-usuario-token" },
};

export default {
  async login(credentials) {
    console.log("Tentando login com:", credentials);
    // return new Promise((resolve, reject) => { ... }) // Estrutura de promessa
    // **** IMPORTANTE: Substitua esta lógica mockada por uma chamada real à sua API backend ****
    // Exemplo com fetch:
    // const response = await fetch('/api/auth/login', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(credentials),
    // });
    // if (!response.ok) {
    //   const errorData = await response.json();
    //   throw new Error(errorData.message || 'Falha no login');
    // }
    // const data = await response.json(); // { user: { ... }, token: "..." }
    // return data;

    // Lógica Mockada:
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const account = mockUsers[credentials.codUfopaCpf];
        if (account && account.password === credentials.password) {
          console.log("Login mockado bem-sucedido para:", account.user.role);
          resolve({ user: account.user, token: account.token });
        } else {
          console.log("Falha no login mockado");
          reject(new Error("Credenciais inválidas"));
        }
      }, MOCK_API_DELAY);
    });
  },

  logout() {
    // Na prática, você pode querer invalidar o token no backend também
    localStorage.removeItem('role');
    localStorage.removeItem('token');
    console.log("Usuário deslogado");
  },
};