# News Ball

Um projeto full-stack para publicação e visualização de notícias esportivas.

## Visão geral

O projeto é dividido em duas partes principais:

- backend: API REST construída em Node.js para gerenciar usuários, autenticação e notícias;
- frontend: aplicação em React + TypeScript usando Vite para consumir a API e exibir as notícias.

## Tecnologias / Stacks

- Backend

  - Node.js
  - Express
  - Prisma ORM (Postgres/ Via Docker)
  - JWT para autenticação
  - bcrypt / bcryptjs para hash de senhas
  - dotenv, cors, express-validator
  - Nodemon (dev)
  - Docker

- Frontend
  - React + TypeScript
  - Vite
  - TailwindCSS
  - axios
  - react-router-dom
  - lucide-react (ícones)

## Estrutura do repositório

- backend/: código do servidor (routes, controllers, middlewares, prisma)
- frontend/: app React (components, pages, services, types)
- docker-compose.yml (opcional conforme configuração do projeto)

## Requisitos

- Node.js (v18+ recomendada)
- npm ou yarn
- Banco definido pelo `prisma/schema.prisma` (se for usar Postgres, configure as variáveis de ambiente)

<br/>
<img border="0" data-original-height="1080" data-original-width="1920" height="600" src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgERIsmIvPD8XS02VttA4ppXQSyRKbduD02gKGNQ7H3fbozhwMjUGiTPdf0Q7ezc3knMu0_Fdeli_7qSUzWeFIGu4cmwUSW7Y1QNWnx8CxVyAcxvuCUwVx-HbOeB_dNFkCJH24KJhh9dN6Q952HqiRn0AdV_7nF9PhCEjxzhrHEqlpGFa2xNseZph9JALB6/s2130/news-ball.jpg" width="1280" />
<br/>

<br/>
<img border="0" data-original-height="1080" data-original-width="1920" height="600" src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj75mT5cXnq0jNZsYzFhv4NMxl6UVLdofNR9mHwRkH_lPoZHNj-WW4Zgv4rZpgo642iej9AvveXHHe9SdPbUSEjmi3FYC9tR-rvdi7-4B8m3QzRJg-8GPgX0363CGUxjpydi0RGglI-nIUpzCBb5YQdzIWcAzCp8OAdNeNOrq4x6NrM5Dm6RO5ZWLwM7YLJ/s1820/news-ball-3.jpg" width="1280" />
<br/>

## Como clonar

No terminal (bash):

```bash
git clone https://github.com/Whofelisberto/news-ball.git
cd news-ball
```

## Como executar (modo desenvolvimento)

1. Backend

- Acesse a pasta do backend, instale dependências, configure o .env e rode as migrations do Prisma:

```bash
cd backend
npm install
# criar um arquivo .env com as variáveis necessárias (ex: DATABASE_URL, JWT_SECRET)
# Exemplo mínimo no .env:
# DATABASE_URL="file:./dev.db"    # para SQLite local
# JWT_SECRET="sua_chave_secreta"

# rodar migrações (se estiver usando Prisma):
npx prisma migrate deploy    # ou `npx prisma migrate dev` em dev

# iniciar servidor em modo dev:
npm run dev
```

Observações:

- Se estiver usando Postgres, ajuste `DATABASE_URL` para a string de conexão e rode as migrations.
- O backend já usa dotenv para carregar variáveis de ambiente; crie o `.env` conforme suas necessidades.

2. Frontend

- Em outro terminal, instale dependências e rode o Vite:

```bash
cd frontend
npm install
npm run dev
```

- Por padrão, o frontend procura a API no endereço configurado em `src/services/api.ts`. Ajuste a URL da API conforme onde o backend estiver rodando (ex: http://localhost:3333).

## Scripts úteis

- Backend (na pasta `backend`):

  - `npm run dev` — inicia o servidor com nodemon

- Frontend (na pasta `frontend`):
  - `npm run dev` — inicia o servidor de desenvolvimento do Vite
  - `npm run build` — build de produção
  - `npm run preview` — preview do build

## Variáveis de ambiente importantes (exemplo)

- BACKEND/.env
  - DATABASE_URL (ex: file:./dev.db ou connection string do Postgres)
  - JWT_SECRET


## Contribuição

Crie uma branch, faça commits claros e abra um Pull Request. Se for reportar bugs, inclua passos para reproduzir.

## Licença

Adicione um arquivo `LICENSE` com a licença desejada (MIT, GPL, etc.) se quiser tornar o repositório público.

---

