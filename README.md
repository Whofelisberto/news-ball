# News Ball

Um projeto full-stack para publicação e visualização de notícias esportivas.

## Visão geral

O projeto é dividido em duas partes principais:

- backend: API REST construída em Node.js para gerenciar usuários, autenticação e notícias;
- frontend: aplicação em React + TypeScript usando Vite para consumir a API e exibir as notícias.

## Tecnologias / Stacks

- Backend

  - Node.js (ES Modules)
  - Express
  - Prisma ORM (Postgres/SQLite - ver `prisma/schema.prisma`)
  - JWT para autenticação
  - bcrypt / bcryptjs para hash de senhas
  - dotenv, cors, express-validator
  - Nodemon (dev)

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

## Dicas rápidas

- Se for usar banco local simples para desenvolvimento, configure `DATABASE_URL="file:./dev.db"` e rode `npx prisma migrate dev`.
- Mantenha o backend rodando em uma porta (ex: 3333) e ajuste a baseURL do axios no frontend (`frontend/src/services/api.ts`).

## Contribuição

Crie uma branch, faça commits claros e abra um Pull Request. Se for reportar bugs, inclua passos para reproduzir.

## Licença

Adicione um arquivo `LICENSE` com a licença desejada (MIT, GPL, etc.) se quiser tornar o repositório público.

---

Se quiser, eu posso:

- adicionar um exemplo de `.env.example` para o backend;
- ajustar o `README.md` do `frontend/` para detalhes da UI;
- adicionar scripts Docker/compose para facilitar execução.
