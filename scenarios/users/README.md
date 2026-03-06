# User Directory — Interview Simulation

**Route:** `/scenarios/users` | **Backend:** `GET /users`, `GET /users/:id`

---

## Initial Brief (what the interviewer says)

> "We'd like you to build a user directory. People should be able to browse users and find
> specific ones. Ask any questions you need before starting."

---

## Before You Code — Clarifying Questions Phase (~3 min)

Type your clarifying questions in chat before writing any code. I'll answer as the interviewer.

**Things intentionally left vague:**
- How many users are there? Does pagination matter?
- Is search client-side or server-side?
- What does clicking a user do — detail panel, separate page, modal?
- What fields should be displayed in the list vs. the detail view?
- Are there any role-based access restrictions?

<details>
<summary>Full spec (read only after asking your questions)</summary>

- Fetch users from `GET /users` (returns `{ data, total, page, limit, totalPages }`)
- Display loading state, error state, and user list
- Each user card: name, email, department
- Phase 2: Text input for client-side search (filter by name/email), debounced 300ms; clicking a user shows a detail panel (name, email, role, department)
- Phase 3: Extract `useFetch<T>` generic hook; implement paginated API calls using `?page=` param
- No authentication needed

</details>

---

## Phase 1 — Basic (~10 min target)

**Build:**
- Fetch users from `GET /users` on mount
- Show loading spinner / skeleton while fetching
- Show error state with retry option if fetch fails
- Render user list: name, email, department per row

**[ Chat checkpoint ]** Before coding: type your state shape and how you'll handle the three states (loading, error, data). I'll confirm or flag issues.

**[ Chat checkpoint ]** After: type what edge cases you haven't handled. I'll follow up.

---

## Phase 2 — Intermediate (~25 min target)

**Build:**
- Search input: filters the displayed list by name or email (case-insensitive)
- Debounce the filter — don't recompute on every keystroke (300ms)
- Clicking a user opens a detail panel on the right (or below the list) showing all fields
- Panel closes when another user is clicked or a close button is pressed
- Handle the case where the user navigates away while a fetch is in flight (cleanup)

**[ Chat checkpoint ]** Before: type your debounce approach and how selectedUser state changes the layout.

**[ Chat checkpoint ]** After: type one trade-off you made under time pressure. I'll dig into it.

---

## Phase 3 — Advanced (~25 min target)

**Build:**
- Extract a `useFetch<T>(url: string)` generic hook returning `{ data, loading, error, refetch }`
- Replace your inline fetch logic with the hook
- Add pagination: show 5 users per page, Previous/Next buttons
  - Use `GET /users?page=N&limit=5` — don't load all users at once
  - Show current page and total pages

**[ Chat checkpoint ]** Before: type how TypeScript generics make `useFetch<T>` safe. I'll ask a follow-up.

**[ Chat checkpoint ]** After: type how you'd handle stale data when navigating pages quickly.

---

## Post-Session Debrief

Let me know in chat when you're done. I can read the code directly. I'll give feedback
and ask follow-up questions from `coaching/follow-ups/users.md`.
