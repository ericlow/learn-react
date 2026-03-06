# Task Manager — Interview Simulation

**Route:** `/scenarios/tasks` | **Backend:** `GET/POST/PATCH/DELETE /tasks`

---

## Initial Brief (what the interviewer says)

> "We'd like you to build a task manager. Users should be able to see their tasks and manage them.
> Take a few minutes to ask any clarifying questions before you start."

---

## Before You Code — Clarifying Questions Phase (~3 min)

Type your clarifying questions in chat before writing any code. I'll answer as the interviewer.

**Things intentionally left vague:**
- Does "manage" mean edit, complete, delete, or all three?
- Should completed tasks be hidden or shown with different styling?
- Is there a limit on task title length?
- Does adding a task require a round-trip to the server, or can it be local?
- Should filters persist across page refreshes?

<details>
<summary>Full spec (read only after asking your questions)</summary>

- Fetch tasks from `GET /tasks` on mount
- Display all tasks in a list (title + completed status)
- Form at the top: text input + "Add" button → `POST /tasks` with `{ title }`
- Phase 2: Filter tabs (All / Active / Done), mark complete via `PATCH /tasks/:id`, delete via `DELETE /tasks/:id`
- Phase 3: Extract `useTasks` custom hook, implement optimistic delete
- Completed tasks should be shown with strikethrough, not hidden
- No title length validation needed for Phase 1

</details>

---

## Phase 1 — Basic (~10 min target)

**Build:**
- Fetch task list from `GET /tasks` on component mount
- Show loading state while fetching
- Show error message if fetch fails
- Display each task: title + completed indicator
- Form with a text input and "Add" button
  - `POST /tasks` with `{ title: string }`
  - Clear input and append new task to list on success

**[ Chat checkpoint ]** Before coding: type your component plan and state shape in chat. I'll confirm or push back before you start.

**[ Chat checkpoint ]** After: type what's working and what you know is missing. I'll ask follow-ups or tell you to move on.

---

## Phase 2 — Intermediate (~25 min target)

**Build:**
- Filter tabs: All | Active | Done (client-side, no extra API calls)
- "Mark complete" toggle — `PATCH /tasks/:id` with `{ completed: true/false }`
- Delete button — `DELETE /tasks/:id`, remove from list on success

**[ Chat checkpoint ]** Before: type what state changes Phase 2 requires. I'll flag anything you've missed before you start.

**[ Chat checkpoint ]** After: type any trade-offs you made. I'll follow up on them.

---

## Phase 3 — Advanced (~25 min target)

**Build:**
- Extract a `useTasks` custom hook that encapsulates:
  - `tasks`, `loading`, `error` state
  - `addTask(title)`, `toggleTask(id)`, `deleteTask(id)` functions
- Implement **optimistic delete**: remove the task from the list immediately, restore it if the DELETE request fails
- Show a toast or inline error if optimistic delete rolls back

**[ Chat checkpoint ]** Before: type your reasoning for extracting the custom hook — what problem does it solve here?

**[ Chat checkpoint ]** After: type what you'd do differently with more time. I'll follow up.

---

## Post-Session Debrief

Let me know in chat when you're done with the session. I can read the code directly —
no need to paste it. I'll give feedback on your implementation and ask follow-up questions.

See `coaching/follow-ups/tasks.md` for the follow-up questions I'm likely to ask.
Answer them in chat using the **answer → reason → trade-off** structure from `coaching/what-to-say.md`.
