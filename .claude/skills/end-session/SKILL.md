---
name: end-session
description: >
  Close out a practice session: read the candidate's code, give structured
  feedback, ask follow-up questions from the coaching guide, score the session,
  and update sessions/history.json. Triggers on "I'm done", "end the session",
  "let's debrief", or when the candidate says they've finished their implementation.
---

# End Session Skill

## What This File Is
Runs the post-session debrief: code review, follow-up questions, scoring, and
history update. Should be invoked after the candidate finishes coding, whether
they completed all phases or ran out of time.

## What This File Is NOT
- Not a mid-session coaching guide — that is `coaching/interviewer-guide.md`
- Not a session starter — that is `/start-session`
- Not a scenario debrief — scenarios have their own debrief instructions in their README

---

## Step 1: Determine Session State

Ask: "Which phase did you reach, and did you finish it?"

Acceptable answers: "finished Phase 3", "got through Phase 2 but not Phase 4",
"didn't finish Phase 2", etc. Record this — it goes into the history entry.

---

## Step 2: Read the Code

Read the files the candidate wrote:
- `backend/src/routes/session.ts` — backend implementation
- `frontend/src/scenarios/active/SessionScenario.tsx` — frontend implementation

Also read the problem spec from `problems/` to know what was asked.

Do not read schema.sql or seed.sql for feedback purposes — those were provided stubs.

---

## Step 3: Code Review

Give structured feedback across four dimensions. Be direct — this is practice,
not encouragement.

### Correctness
- Does the backend return the right shape for what the frontend needs?
- Are SQL queries correct and safe (no string interpolation — use parameterized queries)?
- Does the frontend handle loading, error, and empty states?
- Are side effects correctly scoped (useEffect cleanup, AbortController if needed)?

### React patterns
- State shape: is derived state stored in state (bug), or computed at render (correct)?
- useEffect deps: are all dependencies listed? Any stale closures?
- Is the right hook used — useState for simple values, useReducer for multi-action state?
- Are keys stable in any rendered lists?

### TypeScript
- Are API response types defined, or is everything `any`?
- Are props typed?
- Are there any `as` casts hiding type errors?

### Code quality
- Are there unnecessary re-fetches or duplicate state?
- Is error handling present and user-facing (not just `console.error`)?
- Is the component doing too much (should logic be in a custom hook)?

Format feedback as: what worked well, then specific things to address. For each
issue, reference the exact line or function. Do not just list problems — explain
why each one matters.

---

## Step 4: Follow-Up Questions

Ask 3–4 follow-up questions, one at a time. Wait for the answer before asking
the next.

Source questions from:
- `coaching/follow-ups/` — use the file that matches the scenario type (cart, users,
  tasks, form, feed), or use judgment for session-generated problems
- `coaching/concepts.md` — for conceptual questions triggered by what you saw in the code

**Selection criteria:**
- Prioritize questions about patterns the candidate used (reinforce correct choices)
- Prioritize questions about patterns the candidate missed or got wrong (surface gaps)
- Include at least one question that pushes beyond what they built

Use the **answer → reason → trade-off** structure per `coaching/interviewer-guide.md`.
Push back on incomplete answers. Do not accept "it depends" without a follow-up:
"Depends on what, specifically?"

---

## Step 5: Score the Session

Score on five dimensions, 1–3 each (15 points total):

| Dimension | 1 | 2 | 3 |
|-----------|---|---|---|
| **Phase completion** | Did not finish Phase 2 | Finished Phase 2 or 3 | Finished Phase 4 or strong Phase 3 with stretch |
| **Correctness** | Backend or frontend has bugs that affect core functionality | Core functionality works, minor edge case gaps | All phases correct including loading/error/empty states |
| **React patterns** | Wrong hook, stored derived state, stale closures | Correct patterns, minor hook dependency issues | Correct patterns + proactively explains trade-offs |
| **TypeScript** | `any` throughout, no typed interfaces | Types for API responses and props | Generics, discriminated unions, or utility types used correctly |
| **Communication** | Silent, no design discussion, jumped to code | Articulated design before coding, answered follow-ups adequately | Proactively identified trade-offs, caught own mistakes, asked good questions |

Report the score as a table. Add one sentence of overall assessment.

---

## Step 6: Update Session History

Read `sessions/history.json`. Find the entry with status `"in-progress"` for today's
session. Update it:

```json
{
  "id": "[existing id]",
  "date": "[existing date]",
  "company": "[existing]",
  "problem": "[existing]",
  "branch": "[existing]",
  "status": "complete",
  "phase_reached": "[e.g., 'Phase 3 complete']",
  "score": [total numeric score],
  "notes": "[1-sentence summary of the session's main strength and main gap]"
}
```

Use `"incomplete"` as status if the candidate did not reach Phase 3.

Write the updated JSON back to `sessions/history.json`.

---

## Step 7: Close Out

Say:

> "Session complete. [Score]/15. [One sentence summary.]"

Then offer:
> "Want to keep going on Phase 4, or are you done for today?"

If continuing: stay in the repo and proceed with Phase 4 guidance per
`coaching/interviewer-guide.md`.

If done: suggest running `git add -A && git commit -m "session: [slug] — Phase [N] complete"` to save the work.
