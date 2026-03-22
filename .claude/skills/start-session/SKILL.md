---
name: start-session
description: >
  Start a new full-stack React/Node/TypeScript practice session. Checks session
  history to avoid recent problems, asks about company target and focus, generates
  a problem, creates a git branch, and writes all backend and frontend stubs.
  Triggers on "start a session", "let's practice", "new session", or when the
  user opens this repo and wants to begin.
---

# Start Session Skill

## What This File Is
Runs the full session setup flow: problem selection, file generation, and Phase 1 brief.
After this skill completes, the `interview-coach` behavior in `coaching/interviewer-guide.md`
takes over.

## What This File Is NOT
- Not a scenario runner — use `/scenario-practice` for pre-built scenarios
- Not an end-of-session skill — use `/end-session` when the candidate finishes

---

## Step 0: Startup Checklist

Remind the user if the dev server is not running:
1. Start Docker Desktop
2. `docker start ecstatic_lovelace` (Postgres :5432, db: learn_react, user: postgres)
3. `npm run dev` from root (frontend :5173 + backend :3001)
4. `npm run db:reset` (new sessions only)

Ask: "Is the dev server running?" Wait for confirmation before proceeding.

---

## Step 1: Check Session History

Read `sessions/history.json`. Note the last 5 problem slugs to avoid repeats.

---

## Step 2: Gather Preferences

Ask together: company target (Stripe, Linear, Vercel — or none) and focus area
(useReducer, custom hooks, SQL queries, TypeScript — or none). Use answers to shape
the problem and which phases to emphasize.

---

## Step 3: Generate the Problem

Design a problem with a recognizable domain (dashboard, feed, settings, checkout, etc.)
across four phases:

| Phase | Focus | Time |
|-------|-------|------|
| Phase 1 — Discussion | Component breakdown, state shape, API design — verbal only | 10 min |
| Phase 2 — Backend | Express routes + Postgres queries at `/session/*` | 25 min |
| Phase 3 — Frontend | React component in `SessionScenario.tsx` consuming Phase 2 | 25 min |
| Phase 4 — Advanced | Optimistic UI, pagination, error boundaries, schema extension | 30 min |

Design 2–3 DB tables. Phase 4 should be genuinely stretching, not just "add error handling."

---

## Step 4: Write Problem Spec

Save to `problems/generic/{slug}.md` or `problems/companies/{company}/{slug}.md`.
Slug: `{domain}-{feature}` kebab-case. Include: description, per-phase brief with
expected answers, schema SQL, seed SQL.

---

## Step 5: Create Git Branch

`git checkout -b session/YYYY-MM-DD-{slug}`

---

## Step 6: Write Backend Stubs

- `backend/src/db/schema.sql` — full schema
- `backend/src/db/seed.sql` — 8–15 realistic rows
- `backend/src/routes/session.ts` — route signatures only, all bodies `// TODO`

Remind user to run `npm run db:reset` after.

---

## Step 7: Write Frontend Stub

`frontend/src/scenarios/active/SessionScenario.tsx` — minimal shell: imports
`apiFetch` from `../../lib/api`, renders a heading and placeholder div.

---

## Step 8: Present Phase 1 Brief

Give the 1–2 sentence interviewer brief (intentionally vague). Wait for the candidate
to ask clarifying questions before discussing design. Run per `coaching/interviewer-guide.md`.

Append to `sessions/history.json` with status `"in-progress"` when Phase 1 begins.
