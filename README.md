# MaisArtesao

Sistema web para gestão e comercialização do centro de artesanato de Currais Novos - RN.

## Tecnologias

* **Backend:** NestJS + TypeScript
* **Frontend:** Next.js + TypeScript
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
DB_HOST=postgres
DB_PORT=5432
DB_USERNAME=maisartesao_user
DB_PASSWORD=maisartesao_password
DB_DATABASE=maisartesao

PORT=3000
```
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
