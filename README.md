# MaisArtesao

Sistema web para apoiar a gestão e a comercialização de produtos do centro de artesanato de Currais Novos - RN. A aplicação reúne uma vitrine comercial de produtos, controle de vendas e fluxo de caixa, cadastro de clientes e artesãos, autenticação por perfil e áreas de administração e gestão de estoque.

## 1. Problemática

Ao observar o cenário do centro de artesanato da cidade de Currais Novos, nota-se que o controle de fluxo de caixa e o registro de vendas ainda são feitos de forma totalmente manual. Embora esse método tradicional tenha sido utilizado por muito tempo, ele apresenta graves limitações na atualidade:

* **Risco de perda de dados:** A dependência de registros "à mão" em cadernos eleva o risco de extravio ou rasura de informações importantes.
* **Ineficiência operacional:** Torna o fechamento de caixa lento e dificulta o acompanhamento ágil dos cadastros e do estoque.
* **Falta de visibilidade financeira:** Impede que os artesãos tenham uma visão clara e em tempo real sobre o faturamento real do negócio, além de dificultar que o público encontre e conheça os produtos disponíveis.

## 2. Nossa Solução

Diante da crescente digitalização, nossa proposta consiste em automatizar esses processos por meio de um Sistema de gestão e comercialização automatizado de controle de caixa e vitrine comercial. A solução visa substituir os antigos cadernos por um software com interface simples e intuitiva, capaz de otimizar o tempo dos artesãos, gerar relatórios financeiros básicos e impulsionar a sustentabilidade socioeconômica do artesanato curraisnovense.

Na prática, o MaisArtesao oferece uma aplicação web completa com:

* **Área do cliente:** Acesso fácil e organizado aos produtos artesanais disponíveis para o público.
* **Área do artesão:** Cadastro, consulta e edição das próprias peças, controle de estoque, registro de vendas e visualização de relatórios financeiros.
* **Área administrativa:** Gestão e visualização geral dos usuários e operações cadastradas.
* **Autenticação:** Login seguro com token JWT e direcionamento de acordo com o perfil de acesso.
* **API e persistência:** Backend robusto integrado a banco de dados relacional para garantir a integridade e segurança das informações.

## 3. Tecnologias Usadas

* **Backend:** Node.js, NestJS, TypeScript, TypeORM, Passport e JWT
* **Frontend:** Vue 3, TypeScript, Vite, Vuetify, Pinia, Vue Router e Axios
* **Banco de dados:** PostgreSQL
* **Containerização:** Docker e Docker Compose

## 4. Estrutura do Projeto

```text
MaisArtesao/
├── backend/            # API NestJS, entidades, módulos e seed
├── frontend/           # Aplicação Vue 3 + Vite
├── docker-compose.yml
├── .env.example
└── README.md
```

## 5. Passo a Passo de Utilização

### Pré-requisitos

Antes de iniciar, certifique-se de ter instalado em sua máquina:

* Git
* Node.js 22 ou superior (e npm)
* Docker e Docker Compose (plugin `docker compose`)

### Passo 1: Clonar o repositório

```bash
git clone <URL_DO_REPOSITORIO>
cd MaisArtesao
```

*(Caso tenha recebido os arquivos em formato ZIP, extraia-o e abra o terminal na raiz onde se encontra o arquivo `docker-compose.yml`.)*

### Passo 2: Configurar as variáveis de ambiente (Backend e Docker)

O arquivo `.env` é local e **não é versionado no Git**. Utilize o arquivo `.env.example` como modelo:

```bash
cp .env.example .env
```

Confira se o `.env` possui as configurações necessárias para o ambiente local:

```env
DB_HOST=postgres
DB_PORT=5432
DB_USERNAME=maisartesao_user
DB_PASSWORD=maisartesao_password
DB_DATABASE=maisartesao
PORT=3000
```

> **Atenção:** Antes de utilizar fora de um ambiente de desenvolvimento local, altere principalmente `JWT_SECRET` e `DB_PASSWORD` para valores fortes e próprios.

### Passo 3: Subir o ambiente Docker (Banco e Backend)

Na raiz do projeto, execute:

```bash
docker compose up --build -d
```

### Passo 4: Verificar os containers

Em outro terminal, confira o estado dos serviços:

```bash
docker compose ps
```

Os seguintes serviços devem estar em execução:

* `maisartesao-postgres` (deve aparecer como `Up (healthy)`)
* `maisartesao-backend`

Para acompanhar os logs da API, se necessário:

```bash
docker compose logs -f backend
```

A API estará disponível em `http://localhost:3000`.

### Passo 5: Popular o banco com dados iniciais (Opcional / Recomendado para testes)

Para criar os usuários, categorias e produtos de demonstração definidos no seeder, execute:

```bash
docker compose exec backend npm run run-seed
```

As contas de demonstração geradas utilizam a senha **`123456`**:

| Perfil | E-mail |
| :--- | :--- |
| **Administrador** | `admin@artesao.com` |
| **Artesão** | `anamedeiros@artesao.com` |
| **Cliente** | `joao@cliente.com` |

*(O seeder pode ser executado novamente sem duplicar registros existentes. Utilize essas contas apenas em ambiente local.)*

### Passo 6: Iniciar o Frontend

Abra um segundo terminal, acesse a pasta `frontend` e configure o ambiente:

```bash
cd frontend
npm install
cp .env.example .env
```

Certifique-se de que o `.env` do frontend aponta para a API local:

```env
VITE_API_URL=http://localhost:3000
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Abra no navegador o endereço exibido pelo Vite no terminal (normalmente `http://localhost:5173`). Mantenha os containers do Docker em execução enquanto utiliza o sistema.

## Comandos Úteis

**Na raiz do projeto (Docker):**

```bash
docker compose up -d             # Inicia os serviços em segundo plano
docker compose down              # Para e remove os containers (mantém os dados no volume postgres_data)
docker compose logs -f backend   # Acompanha os logs da API
docker compose ps                # Lista o estado dos serviços
```

**Na pasta `frontend`:**

```bash
npm run dev       # Inicia o frontend em modo de desenvolvimento
npm run build     # Verifica a tipagem e gera o build de produção
npm run preview   # Pré-visualiza a versão compilada
```

## Observações Técnicas

* **Versionamento de ambiente:** O arquivo `.env` não deve ser enviado ao GitHub. Apenas o `.env.example` deve ser versionado para servir de modelo à equipe.
* **Conexão com Banco:** O backend aceita variáveis individuais (`DB_HOST`, `DB_PORT`, `DB_USERNAME`, `DB_PASSWORD`, `DB_DATABASE`) ou uma string única via `DATABASE_URL` para ambientes de deploy.
* **TypeORM:** Está configurado com `synchronize: true` no módulo principal para facilitar a execução acadêmica/local. Para produção, desative a sincronização automática e utilize migrations revisadas.

## Fluxo Git da Equipe

O desenvolvimento deve ser realizado a partir da branch `develop`.

### 1. Atualizar a `develop`

Antes de iniciar uma nova tarefa:

```bash
git switch develop
git pull origin develop
```

### 2. Criar uma branch para a tarefa

```bash
git switch -c feature/nome-da-tarefa

# Exemplo:
git switch -c feature/autenticacao
```

### 3. Desenvolver e realizar commits

```bash
git add .
git commit -m "feat: implementa autenticacao"
```

### 4. Enviar a branch para o GitHub

```bash
git push -u origin feature/autenticacao
```

### 5. Integrar na `develop`

Após finalizar e testar a tarefa, abra um **Pull Request** no GitHub:

```text
feature/nome-da-tarefa
        ↓
     develop
```

Após a revisão e o merge, a `develop` passa a conter a implementação da funcionalidade.