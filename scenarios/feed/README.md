# Live Feed — Interview Simulation

**Route:** `/scenarios/feed` | **Backend:** `GET /tasks` (polling) / WebSocket (Phase 3)

---

## Initial Brief (what the interviewer says)

> "We'd like you to build a live feed that shows the latest tasks as they come in.
> It should stay up to date without the user having to refresh. Ask any questions before starting."

---

## Before You Code — Clarifying Questions Phase (~3 min)

Type your clarifying questions in chat before writing any code. I'll answer as the interviewer.

**Things intentionally left vague:**
- How "live" does it need to be — seconds, milliseconds?
- Is this polling or WebSocket?
- What happens when the user is on a different tab?
- Should the user be able to post new tasks from this view?
- What order should items appear — newest first or oldest first?

<details>
<summary>Full spec (read only after asking your questions)</summary>

- Phase 1: Poll `GET /tasks` every 5 seconds; display tasks newest-first; show last-updated timestamp; manual Refresh button
- Phase 2: Pause polling when `document.hidden` is true (tab not visible); resume on tab focus; show "Paused" indicator when polling is paused
- Phase 3: Replace polling with a simulated WebSocket (the backend doesn't have a real WS endpoint — simulate with a mock or explain the pattern); add a "Post task" input with optimistic UI (add to list immediately, mark as pending until confirmed)
- Items appear newest-first
- No delete or complete actions needed

</details>

---

## Phase 1 — Basic (~10 min target)

**Build:**
- On mount, fetch `GET /tasks` and display newest-first
- Set up a `setInterval` to refetch every 5 seconds
- **Clean up the interval on unmount** (this will be asked about)
- Show last-updated timestamp ("Last updated: 10:42:05 AM")
- Manual "Refresh" button that fetches immediately

**[ Chat checkpoint ]** Before coding: type your understanding of the useEffect lifecycle — when it runs, when cleanup runs, why cleanup matters here. I'll probe it.

**[ Chat checkpoint ]** After: type the difference between `setInterval` and recursive `setTimeout`. I'll tell you if you get it wrong.

---

## Phase 2 — Intermediate (~25 min target)

**Build:**
- Listen to `document.visibilitychange` events
- When `document.hidden` is true: clear the interval, show "Paused" indicator
- When visible again: restart the interval, fetch immediately, show "Live" indicator
- Store the interval ID in `useRef` (not state — explain why)
- Clean up the visibility event listener on unmount

**[ Chat checkpoint ]** Before: type why `useRef` is right for the interval ID and `useState` would be wrong.

**[ Chat checkpoint ]** After: type other scenarios where you'd pause polling. I'll follow up.

---

## Phase 3 — Advanced (~25 min target)

**Build:**
- Replace polling with a WebSocket connection (if backend doesn't support it: explain the implementation pattern and mock it with a local EventEmitter or setTimeout-based fake)
- Add a "New task" text input + "Post" button
- **Optimistic post**: add the task to the top of the list immediately with a "pending" visual indicator
- On success (mocked or real): replace pending item with confirmed item (server-assigned ID)
- On failure: remove the pending item and show an error

**[ Chat checkpoint ]** Before: type the WebSocket lifecycle and how optimistic UI changes your state model.

**[ Chat checkpoint ]** After: type what happens if two users post simultaneously. I'll dig into the conflict handling.

---

## Post-Session Debrief

Let me know in chat when you're done. I can read the code directly. I'll give feedback
and ask follow-up questions from `coaching/follow-ups/feed.md`.
