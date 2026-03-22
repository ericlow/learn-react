# learn-react — Interview Prep

## Purpose

Full-stack React/Node/TypeScript interview practice. Two modes:
- **Dynamic sessions** — generated problems with Postgres backend, git branch per session
- **Scenario practice** — pre-built drills for specific React patterns, in-memory backend

## Startup

```
1. Start Docker Desktop
2. docker start ecstatic_lovelace     # Postgres on :5432, db: learn_react, user: postgres
3. npm run dev                         # frontend :5173 + backend :3001
4. npm run db:reset                    # new dynamic sessions only — applies schema.sql + seed.sql
```

## Stack

```
frontend/    Vite + React + TypeScript + Tailwind (port 5173)
backend/     Express + TypeScript + Postgres via pg Pool (port 3001)
scenarios/   Pre-built scenario READMEs (interview brief + phase spec)
coaching/    Interviewer guide, follow-up questions, concepts reference
problems/    Generated problem specs (generic/ and companies/)
sessions/    history.json — session log (Claude reads/writes each session)
memory/      MEMORY.md — detailed operational reference
```

## Key Files

- `frontend/src/lib/api.ts` — `apiFetch<T>` wrapper (base: `http://localhost:3001`)
- `frontend/src/types/index.ts` — shared TypeScript interfaces
- `frontend/src/scenarios/active/SessionScenario.tsx` — Claude rewrites this per dynamic session
- `backend/src/routes/session.ts` — Claude rewrites this per dynamic session
- `backend/src/db/schema.sql` — Claude rewrites per session; `npm run db:reset` applies it
- `backend/src/db/seed.sql` — Claude rewrites per session; `npm run db:reset` applies it
- `sessions/history.json` — session log: id, date, company, problem, branch, status, score
- `memory/MEMORY.md` — full operational reference; load when you need deeper context

## Skills (Slash Commands)

| Command | When to use |
|---|---|
| `/start-session` | Begin a new dynamic session — checks history, generates problem, writes stubs, presents Phase 1 |
| `/end-session` | Close out a session — code review, follow-up questions, scoring, updates history.json |
| `/scenario-practice` | Run a pre-built scenario drill (no Postgres needed) |

## Coaching Behavior

Act as an interviewer: ask don't tell, use hint ladders, never reveal design answers
before the candidate reasons through them. Full rules: `coaching/interviewer-guide.md`.

## Pre-Built Scenarios

| Scenario | Route | Focus |
|---|---|---|
| Task Manager | `/scenarios/tasks` | useEffect, CRUD, custom hook |
| User Directory | `/scenarios/users` | Pagination, loading/error, search |
| Shopping Cart | `/scenarios/cart` | useReducer, Context, derived state |
| Form Wizard | `/scenarios/form` | Controlled inputs, multi-step state |
| Live Feed | `/scenarios/feed` | Polling, cleanup, real-time UI |
| Spot the Bug | `/scenarios/debug` | Reading and fixing buggy code |
