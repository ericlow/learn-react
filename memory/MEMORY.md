# learn-react Project Memory

## Project Purpose
Full-stack interview prep scaffold — dynamic session system with Postgres, 4-phase format.
Run with `npm run dev` from root (starts frontend :5173 + backend :3001 concurrently).
Reset DB for a session: `npm run db:reset` (applies schema.sql + seed.sql).

## Structure
```
learn-react/
  package.json          # root: dev + db:reset scripts
  sessions/
    history.json        # session history (Claude reads/writes each session)
  problems/
    generic/            # generated problem specs, not company-specific
    companies/          # per-company problem specs (e.g., stripe/, linear/)
  frontend/             # Vite + React + TypeScript + Tailwind (port 5173)
  backend/              # Express + TypeScript, tsx + nodemon (port 3001)
  coaching/             # what-to-say.md + follow-ups/{tasks,users,cart,form,feed}.md
  scenarios/            # README.md per scenario (interview brief + phase spec)
```

## Key Files
- `frontend/src/lib/api.ts` — `apiFetch<T>` wrapper (base: localhost:3001)
- `frontend/src/types/index.ts` — Task, User, Product interfaces
- `frontend/src/components/PhaseTimer.tsx` — floating countdown widget (4 phases)
- `frontend/src/scenarios/active/SessionScenario.tsx` — Claude rewrites per session
- `frontend/src/pages/Home.tsx` — home page with Active Session card + scenario list
- `backend/src/data/seed.ts` — in-memory data (tasks, users, products)
- `backend/src/middleware/delay.ts` — 300ms artificial latency (env: API_DELAY)
- `backend/src/db/client.ts` — pg Pool (reads DATABASE_URL from .env)
- `backend/src/db/schema.sql` — Claude rewrites per session; `npm run db:reset` applies
- `backend/src/db/seed.sql` — Claude rewrites per session; `npm run db:reset` applies
- `backend/src/routes/session.ts` — Claude rewrites per session
- `sessions/history.json` — session log: id, date, company, problem, branch, status

## Phase Format (90 min total)
- Phase 1 — Discussion   10 min
- Phase 2 — Backend      25 min  (routes + DB queries)
- Phase 3 — Frontend     25 min  (React component)
- Phase 4 — Advanced     30 min  (stretch goals, optimistic UI, edge cases)

## Session System
Each session Claude:
1. Reads sessions/history.json — avoids recent problems
2. Asks: targeting a company today? any focus?
3. Generates a problem (domain, data shape, what to build)
4. Creates git branch: `session/YYYY-MM-DD-problem-slug`
5. Writes schema.sql, seed.sql, session.ts (backend stub), SessionScenario.tsx (frontend stub)
6. Writes problem spec to problems/generic/ or problems/companies/{company}/
7. Presents Phase 1 brief — candidate discusses approach
8. At session end, updates history.json with status (complete/incomplete)

Sessions are never retired. Repeats are OK but avoided when recent.
Active session route: frontend /session → backend /session/*

## Backend Routes (fixed, always available)
- GET/POST/PATCH/:id/DELETE/:id /tasks
- GET /users?page=&limit=   GET /users/:id   POST /users/check-email
- GET /products   GET /products/:id
- GET /health
- /session/* — active session routes (Claude writes per session)

## Practice Scenarios (in addition to sessions)
1. Task Manager (/scenarios/tasks)
2. User Directory (/scenarios/users)
3. Shopping Cart (/scenarios/cart)
4. Form Wizard (/scenarios/form)
5. Live Feed (/scenarios/feed)
6. Spot the Bug (/scenarios/debug)

## User Preferences
- Begin every response with exactly 10 fire emojis (🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥) as a visual anchor

## Setup
- `npm install` done at root, frontend, backend
- pg, dotenv, @types/pg installed in backend
- `backend/.env` exists with DATABASE_URL (gitignored, survives shutdown)
- TypeScript passes 0 errors on both frontend and backend

## Startup (after reboot)
1. Start Docker Desktop
2. `docker start ecstatic_lovelace` (Postgres container, port 5432, db: learn_react, user: postgres)
3. `npm run dev` from project root
4. DB data persists in Docker volume — only run `npm run db:reset` when starting a new session
