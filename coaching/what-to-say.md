# How to Communicate During Practice — Chat as the Interview Channel

In a real interview you narrate your thinking out loud. Here, you do the same thing —
but you type it in chat instead of saying it. I read both your code AND your chat messages
and respond as the interviewer: asking follow-ups, pushing back, flagging mistakes, hinting
when you're stuck.

This is closer to a real interview than talking to yourself ever was.

---

## 1. Receiving the Prompt (~1 min)

Type a restatement of what you understood, and flag what's unclear.

> "So you want me to build a task list that fetches from an API and lets me add new tasks.
> Before I start, I have a couple of questions..."

**Why it matters:** Shows you listened. Gives me signal on whether you understood the
brief correctly. If you got something wrong, I'll correct you before you build the wrong thing.

---

## 2. Asking Clarifying Questions (~2-3 min)

Type your questions in chat before writing any code. I'll answer as the interviewer.

**Good questions to ask:**
- "Should completed tasks be hidden, or just styled differently?"
- "Is filtering done on the client or should I hit a different endpoint?"
- "Do I need to handle errors in the UI, or just console.log for now?"
- "Is pagination in scope for this phase?"

**Do NOT ask:**
- "What's a useEffect?" (you should know)
- "Should I use React?" (already specified)
- "What styling library should I use?" (use whatever's there)

**Template:** "Before I start — [thing you're unsure of]. Should I [option A] or [option B]?"

---

## 3. Planning Before Coding (~2 min)

Type your component plan before touching the file. Be specific about state shape.

> "My plan: one component, task list in state, fetch on mount inside useEffect.
> State shape: `{ tasks: Task[], loading: boolean, error: string | null }`.
> I'm going to get the display working before adding the form — want to see real data first.
> Does that approach make sense?"

I'll tell you if your plan has a problem before you invest time building it.

**Template:**
- "My plan is X because Y"
- "I'm deferring Z for now"
- "My state shape will be..."

---

## 4. While Coding

You don't need to type every line you write — but do type when you make a non-obvious decision
or a trade-off. I can see the code; I can't see the reasoning behind it.

**Type when you:**
- Choose one approach over another: "Using local state here rather than context — this data
  is only needed in this component"
- Make a trade-off you know about: "No optimistic update here yet, just waiting on the server
  response — I'll add that in Phase 3"
- Hit something you're unsure about: "Not 100% sure if this dependency array is right —
  thinking through it..."

**Don't type:** obvious things like "I'm adding a button" or restating code you're writing.
Type the *reasoning*, not the transcript.

---

## 5. When You're Stuck

Type what you're stuck on. Don't go quiet. I'll hint — not give the answer, but point you
in the right direction.

> "Hitting an infinite loop in the useEffect. I think the issue is something in the
> dependency array, but I'm not sure what. The fetch depends on userId..."

> "Not sure of the exact API for AbortController. I know I need to cancel the in-flight
> request when the component unmounts, but blanking on the syntax."

Being stuck and saying so coherently is fine. Being stuck and silent for 3 minutes is not.

---

## 6. Finishing a Phase

When you think a phase is done, type a summary before asking me to move on. Don't wait
for me to ask — this is something real interviewers explicitly look for.

> "Phase 1 done — I can fetch, display, and add tasks. What's missing: no error UI yet
> (just console.log), the form doesn't clear on submit, no loading indicator.
> Ready to move to Phase 2, or do you want me to address any of those first?"

I'll either say move on or tell you to fix something specific.

**Template:**
- "Here's what's working: ..."
- "Here's what I know is missing: ..."
- "Ready for Phase 2, or should I address X first?"

---

## 7. Responding to Follow-Up Questions

I'll ask follow-up questions after each phase. Answer in chat with this structure:
**answer → reason → trade-off**

**Example question from me:** "Why did you put the fetch in useEffect rather than a custom hook?"

**Weak answer:** "Because that's where fetches go."

**Strong answer:**
> "useEffect was the fastest path to working code for Phase 1. The trade-off is reusability —
> if I need this same fetch logic elsewhere I'd have to duplicate it. A custom hook like
> `useTasks` would encapsulate loading/error/data and be importable anywhere. I made the
> trade-off consciously to stay in scope, and Phase 3 is where I'd extract it anyway."

**Template:** "[Direct answer]. The reason is [technical justification]. The trade-off is [what you gave up / when you'd do it differently]."

---

---

## Session Format (4-Phase Full-Stack)

When running a session via the Active Session system, the phase structure differs from
the 3-phase practice scenarios. Use the timer's P1–P4 buttons accordingly.

| Phase | Time | What happens |
|-------|------|-------------|
| P1 — Discussion | 10 min | Read the brief. Ask clarifying questions. State your plan: API contract, data shape, component structure. No code yet. |
| P2 — Backend | 25 min | Implement the backend route stub. Write SQL queries, handle errors, validate input. |
| P3 — Frontend | 25 min | Implement the React component. Consume your own API. Handle loading, error, and data states. |
| P4 — Advanced | 30 min | Stretch goals: optimistic UI, edge cases, error boundaries, performance, additional endpoints. |

**P1 is not optional.** The discussion phase is where interviewers form their strongest signal.
Candidates who jump straight to code without articulating the contract first consistently underperform.

**The Backend → Frontend order matters.** Defining the API shape in P2 before building the UI in P3
prevents the most common full-stack mistake: building a frontend that assumes the wrong response shape.

---

## Quick Reference

| Moment | Type in chat |
|--------|-----|
| Prompt received | "I understood this as... before I start, let me ask..." |
| P1 plan | "API contract: GET /X returns { ... }. Component state shape: { ... }. I'll build backend first." |
| Before coding | "My plan is... state shape is... I'm deferring..." |
| Non-obvious decision | "Using X here because Y. Alternative would be Z." |
| Stuck | "Stuck on X. I think the issue is Y but not sure..." |
| Phase complete | "Done with Phase N. Working: ... Missing: ... Ready to move on?" |
| Follow-up answer | "[Answer]. The reason is... The trade-off is..." |

---

## How Claude Should Deliver Code Examples

When asked for a code example, follow this sequence:

1. **Generic example first** — show the full function signature including return type, then a concrete example using an unrelated domain (person, animal, car, teacher) to illustrate the concept without giving away the solution
2. **Hint toward the specific problem** — if still stuck after the generic example
3. **Give the working code directly** — after 3 hints with no progress
