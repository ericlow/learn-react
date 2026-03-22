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
Runs the full session setup flow: problem selection, file generation, and Phase 1
brief. After this skill completes, the candidate begins coding and the
`interview-coach` behavior in `coaching/interviewer-guide.md` takes over.

## What This File Is NOT
- Not a scenario runner — use `/scenario-practice` for the pre-built scenarios
- Not an end-of-session skill — use `/end-session` when the candidate finishes

---

## Step 0: Startup Checklist

Before doing anything else, remind the user of the startup sequence if the dev
server is not already running:

```
1. Start Docker Desktop
2. docker start ecstatic_lovelace   (Postgres on port 5432, db: learn_react, user: postgres)
3. npm run dev                       (from project root — starts frontend :5173 + backend :3001)
4. npm run db:reset                  (only for a new session — applies schema.sql + seed.sql)
```

Ask: "Is the dev server running?" If yes, proceed. If no, wait for confirmation.

---

## Step 1: Check Session History

Read `sessions/history.json`. Extract the list of recent problem slugs (last 5).
These should be avoided when generating the new problem to prevent repeats.

If `history.json` is empty or the sessions array is empty, note that all problems
are available.

---

## Step 2: Gather Preferences

Ask the user two questions (can be asked together):

1. **Company target?** Are you practicing for a specific company today?
   (e.g., Stripe, Linear, Vercel, Shopify — or "no preference")
2. **Focus area?** Any particular area you want to emphasize?
   (e.g., useReducer, custom hooks, optimistic UI, SQL queries, TypeScript generics — or "no preference")

Use these answers to shape the problem domain and which phases to emphasize.

---

## Step 3: Generate the Problem

Design a problem appropriate for the 4-phase format. The problem must have:

### A clear domain
A recognizable real-world feature: a dashboard, a feed, a settings page, a
checkout flow, a notification center, a search interface, etc.

### A database schema
2–3 tables with realistic columns. Must support the operations needed across all
phases. Write this as SQL — it will become `schema.sql`.

### Seed data
8–15 realistic rows. Write this as SQL `INSERT` statements — it will become
`seed.sql`.

### Four phases

| Phase | Focus | Time |
|-------|-------|------|
| Phase 1 — Discussion | Candidate walks through component breakdown, state shape, API design. No coding yet. | 10 min |
| Phase 2 — Backend | Express routes + Postgres queries. 1–3 endpoints the frontend will consume. | 25 min |
| Phase 3 — Frontend | React component consuming those endpoints. useState/useEffect minimum; useReducer or Context if appropriate. | 25 min |
| Phase 4 — Advanced | Stretch goals: optimistic UI, pagination, caching, error boundaries, TypeScript improvements, or a schema extension. | 30 min |

### Constraints
- Phase 2 routes live at `/session/*` — e.g., `GET /session/items`, `POST /session/items`
- Frontend entry point is `frontend/src/scenarios/active/SessionScenario.tsx`
- Use `apiFetch<T>` from `frontend/src/lib/api.ts` for all API calls
- Keep Phase 1 SQL simple enough to explain verbally in 10 minutes
- Phase 4 should be genuinely stretching — not just "add error handling"

---

## Step 4: Write the Problem Spec

Save the problem spec to:
- `problems/generic/{slug}.md` if no company target
- `problems/companies/{company}/{slug}.md` if company-targeted

**Slug format:** `{domain}-{core-feature}` in kebab-case (e.g., `inventory-reorder-alerts`, `checkout-discount-engine`)

Problem spec format:

```markdown
# [Problem Title]

**Domain:** [company or generic]
**Slug:** [slug]
**Generated:** [YYYY-MM-DD]
**Focus:** [focus area if specified, or "general"]

## The Problem

[2–3 sentence description of what the user is building and why]

## Phase 1 — Discussion (10 min)

[What the candidate should walk through verbally: component tree, state shape,
API design, database schema rationale. Include expected answers so the interviewer
(Claude) knows what to confirm or push back on.]

## Phase 2 — Backend (25 min)

[Routes to implement. For each: method, path, request shape, response shape,
SQL query it requires.]

## Phase 3 — Frontend (30 min)

[Component to build. State shape. Which hooks. How it consumes Phase 2 endpoints.]

## Phase 4 — Advanced (30 min)

[3–4 stretch goals, ordered from most to least likely to be reached.]

## Schema

[SQL CREATE TABLE statements]

## Seed

[SQL INSERT statements]
```

---

## Step 5: Create the Git Branch

```
git checkout -b session/YYYY-MM-DD-{slug}
```

Use today's date. Confirm the branch was created.

---

## Step 6: Write Backend Stubs

**`backend/src/db/schema.sql`** — the full schema SQL from Step 3.

**`backend/src/db/seed.sql`** — the full seed SQL from Step 3.

**`backend/src/routes/session.ts`** — stub with route signatures only, no implementation:

```typescript
import { Router } from 'express'
const router = Router()

// [METHOD] [path] — [description]
router.get('/items', async (req, res) => {
  // TODO
  res.json([])
})

// ... additional routes

export default router
```

After writing these files, remind the user to run `npm run db:reset` to apply the schema and seed.

---

## Step 7: Write Frontend Stub

**`frontend/src/scenarios/active/SessionScenario.tsx`** — minimal stub:

```tsx
import { useState, useEffect } from 'react'
import { apiFetch } from '../../lib/api'

// [Problem Title]
// Phase 3: [brief description of what to build]

export default function SessionScenario() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">[Problem Title]</h1>
      <p className="text-gray-500">Implement your solution here.</p>
    </div>
  )
}
```

---

## Step 8: Present Phase 1 Brief

Say to the candidate:

> "[1–2 sentence problem statement — the version the interviewer would say out loud.
> Intentionally vague on details the candidate should ask about.]"

Then:
> "Take a few minutes to ask clarifying questions before we talk through your design."

Wait. Do not proceed to the design discussion until the candidate has asked at least
one clarifying question. Run the session per `coaching/interviewer-guide.md`.

---

## Step 9: Update Session History

At the moment Phase 1 discussion begins, append to `sessions/history.json`:

```json
{
  "id": "[YYYY-MM-DD-slug]",
  "date": "[YYYY-MM-DD]",
  "company": "[company or null]",
  "problem": "[slug]",
  "branch": "session/YYYY-MM-DD-[slug]",
  "status": "in-progress"
}
```

Status will be updated to `"complete"` or `"incomplete"` by `/end-session`.
