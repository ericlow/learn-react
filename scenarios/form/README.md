# Form Wizard — Interview Simulation

**Route:** `/scenarios/form` | **Backend:** `POST /users/check-email`

---

## Initial Brief (what the interviewer says)

> "We'd like you to build a multi-step registration form. Users should be guided through
> filling in their information. Ask any questions before you start."

---

## Before You Code — Clarifying Questions Phase (~3 min)

Type your clarifying questions in chat before writing any code. I'll answer as the interviewer.

**Things intentionally left vague:**
- How many steps are there, and what fields does each step have?
- When should validation run — on each field change, on blur, or on Next/Submit?
- What does "check email" mean — uniqueness validation against a database?
- Can users go back and edit previous steps?
- What happens on submit — API call, redirect, success message?

<details>
<summary>Full spec (read only after asking your questions)</summary>

- Step 1: Name (required) + Email (required)
- Step 2: Password (required, minimum 8 characters)
- Validation runs on Next/Submit (not per-keystroke for Phase 1)
- Phase 2: After step 1, check email uniqueness via `POST /users/check-email` `{ email }` → `{ available: boolean }`. Block Next if email is taken. Show inline error.
- Phase 3: Step 3 appears conditionally based on a step 2 answer (e.g., "Are you signing up as a business?" → shows company name field). Final step is a review screen showing all answers before submit.
- Users can navigate back freely
- On "submit" from the review step: console.log the form data (no real submission needed)

</details>

---

## Phase 1 — Basic (~10 min target)

**Build:**
- Two-step form with a visible step indicator
- Step 1: Name and Email inputs (both required)
- Step 2: Password input (required)
- Validate required fields when "Next" or "Submit" is clicked — show inline error messages
- User can go back from step 2 to step 1 (preserving entered values)

**[ Chat checkpoint ]** Before coding: type your form state shape and where it lives. I'll confirm before you start.

**[ Chat checkpoint ]** After: type what validation cases aren't handled yet. I'll follow up.

---

## Phase 2 — Intermediate (~25 min target)

**Build:**
- After the user enters an email and clicks Next (or on blur), call `POST /users/check-email`
- Show a loading indicator while checking
- If email is taken: show "Email already in use" inline error, block progression
- If available: proceed to step 2
- Debounce or cancel in-flight requests if the user changes the email before the check completes

**[ Chat checkpoint ]** Before: type how async validation fits into your existing state model.

**[ Chat checkpoint ]** After: type what race conditions exist and how you'd fix them. I'll probe this.

---

## Phase 3 — Advanced (~25 min target)

**Build:**
- Add a checkbox to step 2: "Signing up as a business?"
- If checked, a step 3 appears: Company Name (required) and Company Size (select: 1-10, 11-50, 51+)
- If unchecked, step 3 is skipped
- Final step (step 3 or 4 depending on path): **Review screen** showing all entered values with "Edit" links per section
- Clicking "Edit" navigates back to that step; returning to review preserves other fields
- "Submit" button on review step: `console.log(formData)` and show a success message

**[ Chat checkpoint ]** Before: type how you'll model dynamic steps before you write a line.

**[ Chat checkpoint ]** After: type how React Hook Form would change your implementation.

---

## Post-Session Debrief

Let me know in chat when you're done. I can read the code directly. I'll give feedback
and ask follow-up questions from `coaching/follow-ups/form.md`.

**Test emails (already in the system — these will fail the uniqueness check):**
- `alice@example.com`
- `bob@example.com`
- `carol@example.com`
