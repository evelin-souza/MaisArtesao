# MaisArtesao

Sistema web para gestão e comercialização do centro de artesanato de Currais Novos - RN.

## Tecnologias

* **Backend:** NestJS + TypeScript
* **Frontend:** Vue 3 + Vite + TypeScript (Vuetify, Pinia, Axios)
* **Banco de dados:** PostgreSQL
* **Containerização:** Docker + Docker Compose

---

# Inicialização do projeto

O projeto utiliza Docker para padronizar o ambiente de desenvolvimento.

## 1. Clonar o repositório

```bash
git clone <URL_DO_REPOSITORIO>
cd MaisArtesao
```

---

## 2. Criar o arquivo `.env`

O arquivo `.env` não é versionado no Git.

Utilize o arquivo `.env.example` como modelo:

```bash
cp .env.example .env
```

Confira se o `.env` possui as configurações necessárias:

```env
PORT=3000
FRONTEND_URL=http://localhost:5173
JWT_SECRET=troque_por_uma_chave_secreta

DB_HOST=postgres
DB_PORT=5432
DB_USERNAME=maisartesao_user
DB_PASSWORD=maisartesao123
DB_DATABASE=maisartesao
```

Esses valores de `DB_*` também são usados pelo `docker-compose.yml` para criar o PostgreSQL. `FRONTEND_URL` é a origem liberada no CORS do backend (aceita várias separadas por vírgula).

---

## 3. Subir o ambiente Docker

Na raiz do projeto, execute:

```bash
docker compose up --build
```

---

## 4. Verificar os containers

Em outro terminal:

```bash
docker compose ps
```

Os serviços devem estar em execução:

```text
maisartesao-postgres
maisartesao-backend
```

O PostgreSQL deve aparecer como:

```text
Up (healthy)
```
---

## 5. Acessar o backend

O backend estará disponível em:

```text
http://localhost:3000
```

A porta `3000` do container é disponibilizada na porta `3000` da máquina local.

---

## 6. Subir o frontend

O frontend roda fora do Docker. Em outro terminal:

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

O frontend estará disponível em `http://localhost:5173` e consome a API pela variável `VITE_API_URL` (por padrão `http://localhost:3000`).

> Para criar o primeiro usuário, use `POST /usuarios` (por exemplo com `curl`) e depois entre pela tela de login.

---

# Fluxo Git da equipe

O desenvolvimento deve ser realizado a partir da branch `develop`.

## 1. Atualizar a `develop`

Antes de criar uma nova tarefa:

```bash
git switch develop
git pull origin develop
```

## 2. Criar uma branch para a tarefa

Exemplo:

```bash
git switch -c feature/nome-da-tarefa
```

Exemplo:

```bash
git switch -c feature/autenticacao
```

## 3. Desenvolver e realizar commits

```bash
git add .
git commit -m "feat: implementa autenticacao"
```

## 4. Enviar a branch para o GitHub

```bash
git push -u origin feature/autenticacao
```

## 5. Integrar na `develop`

Após finalizar a tarefa, abrir um Pull Request:

```text
feature/nome-da-tarefa
        ↓
     develop
```

Após a aprovação e o merge, a `develop` passa a conter a implementação da funcionalidade.

---

> O arquivo `.env` é local e não deve ser enviado para o GitHub. O arquivo `.env.example` deve ser versionado para servir como modelo para os integrantes da equipe.
