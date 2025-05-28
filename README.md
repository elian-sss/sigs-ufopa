### Documentação do Backend

O backend deste sistema foi desenvolvido em **Java** utilizando o framework **Spring Boot**, com foco em segurança da informação e arquitetura separada de frontend e backend (API REST). A seguir, estão detalhados os principais arquivos de configuração e controle de segurança implementados.

---

#### 1. `SecurityConfig.java`

Responsável pela configuração central de segurança do backend, utilizando **Spring Security**. Os principais mecanismos implementados são:

- **Autenticação JWT:**  
  Utiliza tokens JWT assinados com chaves RSA para autenticação e autorização dos usuários. As chaves pública e privada são configuradas via propriedades do sistema.
- **Proteção de Endpoints:**  
  Apenas o endpoint `/login` é público; todos os demais exigem autenticação.
- **CORS:**  
  Permite que o frontend (por padrão, em `http://localhost:5173`) acesse a API, aceitando todos os headers e métodos HTTP, e permitindo o envio de credenciais.
- **CSRF:**  
  Desabilitado, pois o sistema utiliza JWT e sessões stateless.
- **Sessão Stateless:**  
  O backend não mantém sessões de usuário, tornando a aplicação mais escalável e segura.
- **Criptografia de Senhas:**  
  As senhas são criptografadas com BCrypt antes de serem armazenadas.

**Principais tecnologias:**  
Spring Security, JWT (Nimbus JOSE + JWT), BCrypt.

---

#### 2. `AdminUserConfig.java`

Garante a existência de um usuário administrador padrão ao iniciar a aplicação.

- **Criação automática do usuário admin:**  
  Ao subir o backend, verifica se existe o usuário `admin@email.com`. Se não existir, cria um novo usuário com senha padrão (criptografada) e papel de administrador.
- **Associação de papel:**  
  O usuário recebe automaticamente o papel `ADMIN`.
- **Criptografia de senha:**  
  Utiliza BCrypt para armazenar a senha de forma segura.
- **Execução transacional:**  
  Garante que todas as operações de banco de dados sejam atômicas.

**Observação de segurança:**  
É fundamental alterar a senha padrão do usuário administrador após o primeiro acesso em ambientes de produção.

---

#### 3. `TokenController.java`

Implementa o endpoint de autenticação da aplicação.

- **Endpoint de login (`POST /login`):**  
  Recebe e-mail e senha, valida as credenciais e gera um token JWT para o usuário autenticado.
- **Validação de credenciais:**  
  Busca o usuário pelo e-mail e valida a senha utilizando BCrypt.
- **Geração de JWT:**  
  O token inclui o ID do usuário, emissor, data de emissão e expiração (5 minutos), e os papéis do usuário no claim `scope`.
- **Resposta segura:**  
  Retorna ao frontend o token JWT e o tempo de expiração.

**Fluxo resumido:**  
O usuário envia e-mail e senha para `/login`; se válidos, recebe um JWT para autenticar as próximas requisições.

---

#### Tecnologias Utilizadas

- **Spring Boot** e **Spring Security**
- **JWT** (JSON Web Token)
- **BCrypt** para hashing de senhas
- **Spring Data JPA** para persistência

---

### Documentação do Frontend

O frontend do sistema foi desenvolvido em **Vue.js 3**, com foco em segurança, controle de acesso e integração eficiente com o backend via API REST. A seguir, estão detalhados os principais arquivos e mecanismos de segurança implementados.

---

#### 1. `src/router/index.js`

Responsável pela configuração das rotas e pelo controle de acesso a cada página do sistema.

- **Rotas protegidas por autenticação e papel:**  
  Cada rota define, via metadados, se exige autenticação (`requiresAuth`) e quais papéis de usuário podem acessá-la (`roles`).  
  Exemplos:  
  - `/admin`: apenas para `admin`  
  - `/usuario`: para `usuario` e `admin`  
  - `/coordenador`: para `coordenador` e `admin`  
  - `/seguranca`: para `seguranca` e `admin`  
  - `/login`: apenas para visitantes não autenticados (`requiresGuest`)
- **Redirecionamento inteligente:**  
  Usuários não autenticados são redirecionados para o login. Usuários autenticados, mas sem o papel necessário, são redirecionados para a página principal do seu papel ou recebem alerta de acesso negado.
- **Controle centralizado:**  
  O controle de acesso utiliza os getters do Vuex Store para verificar autenticação e papel do usuário antes de cada navegação.
- **Fallbacks:**  
  Acesso à raiz (`/`) e rotas não encontradas redirecionam para a página adequada conforme o estado de autenticação.

**Tecnologias:** Vue.js 3, Vue Router, Vuex

---

#### 2. `src/utils/axios.js`

Centraliza a configuração do cliente HTTP da aplicação, utilizando **Axios**.

- **Base URL:**  
  Todas as requisições são direcionadas para o backend em `http://localhost:8080`.
- **Interceptors de requisição:**  
  Antes de cada requisição, verifica se há um token JWT no `localStorage` e, se houver, adiciona automaticamente ao cabeçalho `Authorization` (`Bearer <token>`).
- **Centralização da autenticação:**  
  Garante que todas as requisições autenticadas enviem o token de forma segura e padronizada.

**Tecnologia:** Axios

---

#### 3. `src/api/auth.js`

Implementa as funções responsáveis pela autenticação do usuário.

- **`login(email, password)`:**  
  Realiza uma requisição `POST` para `/login`, enviando as credenciais do usuário.  
  Retorna o token JWT e o tempo de expiração, que devem ser armazenados no frontend.
- **`logout(token)`:**  
  (Opcional, depende da estratégia do backend) Remove o token do armazenamento local ou faz requisição para invalidar o token no backend.

**Boas práticas:**  
O token JWT nunca é exposto em tela ou URL, sendo tratado apenas em memória e no armazenamento local.

---

#### 4. `src/views/LoginView.vue`

Tela de login do sistema, responsável por autenticar o usuário e armazenar o token JWT.

- **Formulário de login:**  
  Permite ao usuário informar e-mail e senha, com proteção contra múltiplos envios.
- **Autenticação:**  
  Ao submeter, chama a função de login da API. Se autenticado, salva o token JWT e o papel do usuário no `localStorage`.
- **Redirecionamento seguro:**  
  Após login, redireciona automaticamente para a página principal do papel do usuário ou para a rota originalmente requisitada.
- **Tratamento de erros:**  
  Exibe mensagens amigáveis em caso de falha na autenticação.

**Tecnologias:** Vue.js 3 (Composition API), Vue Router, jwt-decode

---

#### Boas práticas de segurança implementadas no frontend

- **Controle de acesso baseado em papéis (RBAC)**
- **Envio automático do token JWT em todas as requisições autenticadas**
- **Redirecionamento automático para evitar acesso não autorizado**
- **Separação clara entre rotas públicas e protegidas**
- **Token JWT nunca exposto em tela ou URL**
- **Mensagens de erro sem detalhes sensíveis**
