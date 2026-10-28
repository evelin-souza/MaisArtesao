# 🛒 Front-End — Plataforma de Artesanato

Este é o repositório front-end da aplicação, desenvolvido com **Vue 3**, **TypeScript**, **Vite** e **Pinia**. A interface conta com painéis para administradores, artesãos e clientes.

## 🚀 Pré-requisitos

Antes de começar, garante que tens instalado na tua máquina:

* [Node.js](https://nodejs.org/) (versão 18+ recomendada)
* [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

---

## 📦 Instalação das Dependências

Se você acabou de clonar o repositório e precisa instalar todas as dependências listadas no `package.json`, basta rodar:

```bash
npm install
```

---

### ➕ Adicionando Dependências Manualmente (se necessário)

Caso precise adicionar as dependências principais ao projeto do zero, utilize os comandos abaixo:

#### 1. Bibliotecas Principais (Roteamento, Estado e HTTP)
```bash
npm install vue-router@4 pinia axios
```

#### 2. Ícones e Estilização (Se utilizar Tailwind CSS)
```bash
npm install -D tailwindcss postcss autoprefixer
npm install lucide-vue-next
npx tailwindcss init -p
```

#### 3. Suporte a TypeScript e Tipos do Node
```bash
npm install -D @types/node typescript
```

---

## 🛠️ Passo a Passo para Executar o Projeto

### 1. Clonar o Repositório

```bash
git clone <URL_DO_REPOSITORIO>
cd <NOME_DA_PASTA>
```

### 2. Instalar as Dependências

```bash
npm install
```

### 3. Configurar Variáveis de Ambiente (Opcional)

Se necessário, cria um arquivo `.env` na raiz do projeto com o endereço da tua API backend:

```env
VITE_API_BASE_URL=http://localhost:3000
```

### 4. Iniciar o Servidor de Desenvolvimento

Para rodar a aplicação em modo de desenvolvimento com *Hot Reload*:

```bash
npm run dev
```

Após o comando, o terminal exibirá o link local (geralmente `http://localhost:5173`). Abre-o no teu navegador.

---

## 🛠️ Outros Comandos Úteis

| Comando | Descrição |
| :--- | :--- |
| `npm run dev` | Inicia o servidor local de desenvolvimento |
| `npm run build` | Compila os arquivos para produção na pasta `dist/` |
| `npm run preview` | Testa a versão de produção localmente após o `build` |

---

## 📁 Estrutura das Pastas (`src/`)

```text
src/
├── assets/          # Imagens, ícones e arquivos estáticos
├── components/      # Componentes reutilizáveis (Navbar, Cards, Modais)
├── routes/          # Configuração das rotas do Vue Router
├── services/        # Configuração das chamadas à API (Axios/Fetch)
├── stores/          # Gerenciamento de estado global (Pinia / Auth)
├── views/           # Páginas principais da aplicação (Dashboard, Login, Vitrine)
├── App.vue          # Componente raiz da aplicação
└── main.ts          # Ponto de entrada do TypeScript/Vue
```

---

## 👥 Papéis de Usuário (Views)

* **Cliente:** Acesso à vitrine de produtos (`ClienteVitrine.vue`)
* **Artesão:** Painel de gestão de produtos (`ArtesaoDashboard.vue`)
* **Administrador:** Painel administrativo geral (`AdminDashboard.vue`)