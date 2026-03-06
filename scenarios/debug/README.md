# Spot the Bug — Interview Simulation

**Route:** `/scenarios/debug`

A different format from the build scenarios. Each exercise presents broken code.
Your job: diagnose the bug, explain it in chat, then fix it.

This mirrors the CoderPad "identify and fix" question format used at senior level.

---

## How to Use This

1. Open `/scenarios/debug` in the browser
2. Read each bug's description and observe the broken behavior
3. **Before touching the code:** type in chat what you think the bug is and why — I'll confirm or redirect
4. Find and fix it in `frontend/src/scenarios/debug/DebugScenario.tsx`
5. Check the answer in the collapsible below each bug
6. Answer the follow-up questions in chat — I'll push back if something's off

---

## Bug 1 — Interval Leak

**What it should do:** Increment a counter every second.

**Symptom:** Navigate away from the page and back. The counter accelerates — it ticks
faster and faster with each visit. Open the console; you'll see multiple intervals firing.

**Broken code:**
```tsx
useEffect(() => {
  const id = setInterval(() => setCount(c => c + 1), 1000)
  // something is missing here
}, [])
```

<details>
<summary>Answer</summary>

**The bug:** `useEffect` starts a `setInterval` but never returns a cleanup function.
Every time the component mounts (or in StrictMode, mounts twice), a new interval is created.
They accumulate — each one incrementing the counter independently.

**The fix:**
```tsx
useEffect(() => {
  const id = setInterval(() => setCount(c => c + 1), 1000)
  return () => clearInterval(id)  // cleanup on unmount
}, [])
```

**The rule:** Every side effect that allocates a resource (interval, timeout, event listener,
WebSocket, subscription) must release it in the cleanup function.

</details>

**Follow-up questions:**
- "What triggers the cleanup function to run?" (unmount, and before re-running the effect when deps change)
- "Why does React StrictMode intentionally mount components twice in development?"
- "What's the difference between `setInterval` and recursive `setTimeout` for polling?"

---

## Bug 2 — Stale State Update

**What it should do:** Clicking the button should add 2 to the counter (it calls `increment` twice).

**Symptom:** Clicking the button only adds 1, not 2.

**Broken code:**
```tsx
function increment() {
  setCount(count + 1)
  setCount(count + 1)  // uses same stale `count` — both updates are identical
}
```

<details>
<summary>Answer</summary>

**The bug:** Both `setCount(count + 1)` calls read `count` from the closure, which is
captured at the start of the render. Both see the same value (e.g., `5`), so both enqueue
`setCount(6)`. React batches them — result: 6, not 7.

**The fix:** Use the functional update form so each update receives the latest state:
```tsx
function increment() {
  setCount(prev => prev + 1)
  setCount(prev => prev + 1)  // receives the result of the first update
}
```

**The rule:** Any time a state update depends on the previous value of that state,
use `setX(prev => ...)`. This is especially important inside async callbacks, timeouts,
and event handlers where multiple updates are batched.

</details>

**Follow-up questions:**
- "When does React batch state updates? Has this changed across versions?" (React 18 batches everywhere; before that, only inside React event handlers)
- "What's a stale closure? How does it cause bugs in useEffect?"
- "If `setCount` is called three times in one event handler, how many re-renders happen?"

---

## Bug 3 — Object in useEffect Dependencies (⚠️ Shown as code only — do not add to rendered page)

**What it should do:** Fetch data when `config` changes.

**Symptom:** Infinite network requests — the page hammers the API in a loop.

**Broken code:**
```tsx
function DataLoader({ userId }: { userId: string }) {
  const [data, setData] = useState(null)

  // Bug: `options` is a new object literal on every render
  // React compares deps by reference — new object !== old object, always
  const options = { sort: 'asc', limit: 10 }

  useEffect(() => {
    apiFetch(`/users/${userId}`, options).then(setData)
  }, [userId, options])  // options triggers re-render → new options object → re-runs effect → loop
}
```

<details>
<summary>Answer</summary>

**The bug:** `options` is defined inside the component body, so it's a brand-new object
reference on every render. React compares deps with `Object.is` — two different object
references are never equal, even if their contents are identical. So the effect runs,
updates state, triggers a re-render, creates a new `options` object, which triggers the
effect again — infinite loop.

**Fix option A:** Move the object outside the component if it's static:
```tsx
const OPTIONS = { sort: 'asc', limit: 10 }

function DataLoader({ userId }: { userId: string }) {
  useEffect(() => {
    apiFetch(`/users/${userId}`, OPTIONS).then(setData)
  }, [userId])
}
```

**Fix option B:** Use `useMemo` if it depends on props/state:
```tsx
const options = useMemo(() => ({ sort: 'asc', limit: 10 }), [])
```

**Fix option C:** Use individual primitive values as deps instead of an object:
```tsx
useEffect(() => {
  apiFetch(`/users/${userId}`, { sort, limit }).then(setData)
}, [userId, sort, limit])
```

**The rule:** Objects, arrays, and functions created inline inside a component are new
references on every render. Never put them in a dependency array — move them out, memoize
them, or decompose them into primitives.

</details>

**Follow-up questions:**
- "How does React compare dependency array values?" (`Object.is` — same as `===` except for `NaN` and `-0`)
- "What linting rule catches this?" (`react-hooks/exhaustive-deps` from eslint-plugin-react-hooks)
- "Why is a function defined in the component body also dangerous in deps?"

---

## Bug 4 — Stale useEffect Dependency

**What it should do:** Display user details for whichever `userId` prop is currently passed in.
When `userId` changes, it should re-fetch.

**Symptom:** The displayed user never updates when `userId` changes — always shows the first user loaded.

**Broken code:**
```tsx
function UserDetail({ userId }: { userId: string }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    apiFetch<User>(`/users/${userId}`).then(setUser)
  }, [])  // Bug: empty deps — only runs on mount, ignores prop changes
}
```

<details>
<summary>Answer</summary>

**The bug:** `[]` tells React "run this effect once on mount and never again." So when
the parent changes `userId`, the effect doesn't re-run. The component displays stale data.

**The fix:**
```tsx
useEffect(() => {
  apiFetch<User>(`/users/${userId}`).then(setUser)
}, [userId])  // re-fetch whenever userId changes
```

**Bonus — cancellation:** If `userId` changes while a fetch is in-flight, the old response
can arrive after the new one and overwrite it (race condition). Fix with `AbortController`:
```tsx
useEffect(() => {
  const controller = new AbortController()
  apiFetch<User>(`/users/${userId}`, { signal: controller.signal })
    .then(setUser)
    .catch(err => { if (err.name !== 'AbortError') setError(err.message) })
  return () => controller.abort()
}, [userId])
```

**The rule:** If your effect uses a prop or state value, that value belongs in the
dependency array. Omitting it creates a stale closure — the effect captures the value at
the time it last ran, not the current value.

</details>

**Follow-up questions:**
- "What is a race condition in the context of React data fetching?"
- "How does `AbortController` work? What does `abort()` do to a pending fetch?"
- "Why might an eslint rule warn about an empty dependency array when the effect uses a prop?"

---

## Bug 5 — Index as List Key

**What it should do:** Display a list of editable items. Prepending "New Item" should
insert it at the top; existing inputs should keep their values.

**Symptom:** Prepend a new item, then type into an input. Prepend again. The input
values appear to "stay behind" — the new item inherits the old item's DOM state.

**Broken code:**
```tsx
{items.map((item, index) => (
  <div key={index}>  {/* Bug: index shifts when items are prepended */}
    <input defaultValue={item} />
  </div>
))}
```

<details>
<summary>Answer</summary>

**The bug:** React uses `key` to match virtual DOM nodes between renders. When you use
`index` as the key, prepending a new item shifts every existing item's index up by 1.
React thinks the element at `key=0` should update from "Apple" to "New Item" — so it
updates the text node but reuses the existing DOM element, including its uncontrolled
input value. The input shows the wrong value.

**The fix:** Use a stable, unique identifier from the data:
```tsx
{items.map((item) => (
  <div key={item.id}>
    <input defaultValue={item.label} />
  </div>
))}
```

If your data truly has no IDs (e.g., user-entered strings), generate them on creation:
```tsx
const [items, setItems] = useState([
  { id: crypto.randomUUID(), label: 'Apple' },
])
```

**When index-as-key is safe:** Static lists that are never reordered, filtered, or
prepended to. If the list only appends (like a log), index as key is fine. The problem
is specifically mutations that change an item's position.

**The rule:** `key` should be stable, unique, and not tied to position. The eslint rule
`react/no-array-index-key` catches this.

</details>

**Follow-up questions:**
- "Why does this bug only affect uncontrolled inputs (defaultValue) and not controlled inputs (value)?"
- "If you're generating IDs client-side with `Math.random()`, what could go wrong?"
- "What happens to component state (not just DOM state) when React reuses an element at the same key?"

---

## Post-Session Debrief

After working through all 5 bugs, try explaining each one from memory in chat without
looking at the code — as if I handed you the broken snippet and asked "what's wrong here?"

That's the exact format you'll face. The goal is:
1. Diagnose in chat within 60 seconds
2. State the fix and the underlying rule
3. Answer my follow-up on the same concept
