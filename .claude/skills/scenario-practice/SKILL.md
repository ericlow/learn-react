---
name: scenario-practice
description: >
  Run a practice session using one of the pre-built scenarios (task manager,
  user directory, shopping cart, form wizard, live feed, spot the bug). These
  use the existing in-memory backend — no database reset needed. Use when the
  user wants a focused drill on a specific React pattern without the full
  session setup overhead. Triggers on "scenario practice", "let's do the cart
  scenario", "I want to practice [topic]", or when the user names a specific
  scenario.
---

# Scenario Practice Skill

## What This File Is
Runs a pre-built scenario as a focused practice session. Simpler than `/start-session`
— no problem generation, no git branch, no database. The scenario spec is already
written; this skill loads it and runs the interview.

## What This File Is NOT
- Not the dynamic session system — use `/start-session` for generated problems with Postgres
- Not an end-of-session skill — after the scenario, debrief inline using the scenario's
  own debrief instructions and `coaching/follow-ups/`

---

## Step 1: Dev Server Check

The scenarios use the in-memory backend, not Postgres. Only `npm run dev` is needed —
no Docker, no `db:reset`.

Ask: "Is the dev server running (`npm run dev`)?" If not, ask them to start it first.

---

## Step 2: Select a Scenario

If the user named a specific scenario, use it. Otherwise, present the menu:

| # | Scenario | Route | Primary focus |
|---|----------|-------|---------------|
| 1 | Task Manager | `/scenarios/tasks` | useEffect fetch, CRUD operations, custom hook |
| 2 | User Directory | `/scenarios/users` | Pagination, loading/error states, search |
| 3 | Shopping Cart | `/scenarios/cart` | useReducer, Context, derived state |
| 4 | Form Wizard | `/scenarios/form` | Controlled inputs, multi-step state, validation |
| 5 | Live Feed | `/scenarios/feed` | Polling, cleanup, real-time UI patterns |
| 6 | Spot the Bug | `/scenarios/debug` | Reading and fixing buggy React code |

Recommend based on what the user said they want to focus on. If no preference,
recommend based on what is underrepresented in `sessions/history.json`.

---

## Step 3: Load the Scenario

Read `scenarios/{scenario}/README.md`.

This file contains:
- The interviewer brief (what to say to open the session)
- Clarifying questions that are intentionally left vague
- The full spec (inside a `<details>` block — do not reveal until asked or until
  the candidate has asked their clarifying questions)
- Phase breakdown with time targets and chat checkpoints
- Debrief instructions

**Do not read the full spec aloud. You have it; the candidate does not.**

---

## Step 4: Open the Session

Say the interviewer brief verbatim from the scenario README. For example:

> "We'd like you to build a shopping cart. Users should be able to browse products
> and manage items they want to buy. Take some time to ask clarifying questions."

Then wait silently. Do not add context, hints, or elaboration.

---

## Step 5: Run the Session

Follow `coaching/interviewer-guide.md` throughout:

- **Clarifying questions phase:** Answer factual spec questions directly. Turn
  design questions back: "What are you thinking?"
- **Planning phase (before coding):** Ask the candidate to state their component
  breakdown and state shape before they write any code.
- **During coding:** Only interject if stuck (3+ min silence), wrong path, or
  explicitly asked. Use the hint ladder.
- **Chat checkpoints:** The scenario README has specific checkpoint prompts. Ask
  them at the right phase transitions. Wait for the candidate's response before
  proceeding.
- **Phase transitions:** Reveal Phase 2 only after Phase 1 is working. Do not
  reveal Phase 3 during Phase 2.

---

## Step 6: Post-Scenario Debrief

When the candidate says they're done:

1. Read their code directly from `frontend/src/` — they should have built in the
   scenario route component
2. Give feedback (correctness, React patterns, TypeScript) — same structure as
   `/end-session` Step 3
3. Ask 3 follow-up questions from `coaching/follow-ups/{scenario}.md`, one at a time
4. Ask one question from `coaching/concepts.md` relevant to what you saw in the code

No scoring rubric, no history update — scenarios are drills, not tracked sessions.

---

## Scenario-Specific Notes

### Task Manager
Key patterns to watch: does the candidate store filter state separately from task
state, or derive filtered tasks at render? Common mistake: storing `filteredTasks`
in state instead of deriving from `tasks + activeFilter`.

### User Directory
Key patterns to watch: race condition handling on search (stale fetch results).
Common mistake: no AbortController, so a slow response overwrites a faster one.

### Shopping Cart
Key patterns to watch: subtotal stored in state (bug) vs. computed at render (correct).
Common mistake: adding items by mutating existing state rather than returning new array.

### Form Wizard
Key patterns to watch: single `formData` object in state vs. separate state per field.
Common mistake: no validation before advancing steps; missing controlled input pattern.

### Live Feed
Key patterns to watch: cleanup function in useEffect to clear interval on unmount.
Common mistake: setInterval without cleanup causes memory leak and state update on
unmounted component.

### Spot the Bug
Do not reveal the bugs upfront. Let the candidate read the code and identify them.
Ask: "Walk me through what you see." Only confirm a bug after they name it.
