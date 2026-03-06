# Core Concepts — Verbal Interview Questions

These topics appear as pure conversation questions at the senior level.
No coding required — but you need a crisp, confident verbal answer.

Use the structure: **what it is → why it exists → trade-offs / when to use it**

---

## 1. Virtual DOM & Reconciliation

### What to say
> "The virtual DOM is a lightweight in-memory representation of the real DOM tree.
> When state changes, React re-renders the component into a new virtual DOM tree,
> then diffs it against the previous one — a process called reconciliation.
> Only the actual differences are applied to the real DOM, which is expensive to update.
> This batching and minimizing of real DOM mutations is what makes React fast."

### The diffing algorithm (follow-up depth)
React's diffing makes two assumptions to reduce O(n³) tree comparison to O(n):
1. Two elements of different types produce entirely different trees (React tears down and rebuilds)
2. Keys tell React which list items are stable across renders

Without keys, React matches list items by position — so inserting at the top destroys and
recreates every item below. With stable keys, React can move, add, or remove just the changed item.

### Why index-as-key is a bug (not just a lint warning)
If you prepend an item to a list keyed by index:
- Item at index 0 changes from "Apple" to "New Item"
- React thinks the existing Apple element should update to "New Item"
- Uncontrolled inputs (defaultValue) retain their old DOM values — wrong data shown to user
- Controlled inputs re-render correctly but animations, focus state, and transitions break

### Likely follow-ups
- "What happens when React sees two elements with different types at the same position?"
  → Tears down the old subtree completely, builds new one from scratch. Expensive — avoid swapping element types.
- "Why is the virtual DOM faster than direct DOM manipulation?"
  → It isn't always. The win is batching: React accumulates changes across a render cycle and applies them in one pass, rather than thrashing the DOM with many individual updates.
- "What is React Fiber?"
  → The reconciler rewrite (React 16+). Fiber splits rendering into interruptible units of work,
  enabling time-slicing and Concurrent Mode features (Suspense, transitions).

---

## 2. Flux Architecture & Unidirectional Data Flow

### What to say
> "Flux is an architectural pattern — not a library — where data flows in one direction:
> Action → Dispatcher → Store → View. When the user interacts with the view, it dispatches
> an action, the store updates, and the view re-renders from the new state.
> Redux is the most popular implementation of this pattern. React's useReducer is a
> lightweight version of the same idea scoped to a single component."

### The core guarantee
Unidirectional flow makes state changes predictable and traceable — you always know
exactly what caused a state change and in what order. This is the opposite of two-way
data binding (Angular 1 style), where any layer could mutate shared state.

### Redux vs. Context API
| | Redux | Context API |
|---|---|---|
| Purpose | Global state management with predictable mutations | Dependency injection — avoids prop drilling |
| DevTools | Time-travel debugging, action log | None built-in |
| Performance | Selectors prevent unnecessary re-renders | All consumers re-render on any change |
| Boilerplate | High (actions, reducers, selectors) | Low |
| Best for | Complex shared state, teams needing audit trail | Theme, auth, locale — infrequently changing values |

> "I'd reach for Context when I need to share something like auth or theme that doesn't
> change often. I'd reach for Redux (or Zustand) when I have complex update logic,
> need DevTools for debugging, or need fine-grained subscription to prevent re-renders."

### Likely follow-ups
- "What is a pure reducer?"
  → A function with no side effects that returns new state from (state, action). Same inputs always produce same output. Makes testing trivial and enables time-travel debugging.
- "What's the difference between Redux Toolkit and classic Redux?"
  → RTK eliminates boilerplate: createSlice generates action creators and reducers together, immer handles immutability, and configureStore sets up devtools automatically.

---

## 3. Code Splitting & React.lazy / Suspense

### What to say
> "Code splitting means splitting your JavaScript bundle into smaller chunks that are
> loaded on demand rather than all upfront. In React, `React.lazy` lets you dynamically
> import a component, and `Suspense` lets you declaratively handle the loading state
> while that chunk is being fetched. The most common use case is route-level splitting —
> each page only loads when the user navigates to it."

### The pattern
```tsx
const Settings = React.lazy(() => import('./pages/Settings'))

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Suspense>
  )
}
```

The `import()` call is a dynamic import — it returns a Promise. React.lazy unwraps it.
The fallback renders while the Promise is pending.

### Why it matters
- Initial bundle only contains code for the current route
- Subsequent pages load in parallel with the user navigating
- Critical for large apps — can cut initial load time significantly

### Likely follow-ups
- "What's the difference between Suspense for code splitting and Suspense for data fetching?"
  → Same mechanism — Suspense catches any thrown Promise. Code splitting throws a Promise for the chunk download. Data fetching libraries (React Query, SWR) can throw Promises for pending data too. React 18+ makes data Suspense first-class.
- "What happens if the lazy import fails (network error)?"
  → Need an Error Boundary wrapping the Suspense to catch the rejection and show a fallback error UI.

---

## 4. Class Components vs. Functional Components

### What to say
> "Class components were the original way to use state and lifecycle methods in React.
> Functional components with hooks replaced them as the preferred pattern starting with
> React 16.8. Hooks let you reuse stateful logic through custom hooks — something class
> components couldn't do without HOCs or render props, which were clunky. Today there's
> no reason to write new class components, but you'll find them in older codebases."

### Key differences
| | Class | Functional |
|---|---|---|
| State | `this.setState({})` | `useState` |
| Side effects | `componentDidMount` / `componentDidUpdate` / `componentWillUnmount` | `useEffect` |
| Sharing logic | HOCs, render props | Custom hooks |
| `this` binding | Required, error-prone | Not needed |
| Error boundaries | Supported | Not yet supported (as of React 18) |

### The `this` problem (worth mentioning)
Class event handlers must be bound: `this.handleClick = this.handleClick.bind(this)` in
the constructor, or use class field arrow functions. Forgetting this is a common bug.
Functional components have no `this`.

### Likely follow-ups
- "Can you still use class components in React 18?"
  → Yes, fully supported. Error boundaries still require class components.
- "What lifecycle method does useEffect replace?"
  → All three: componentDidMount (empty deps), componentDidUpdate (deps array), componentWillUnmount (cleanup function). One hook replaces three lifecycle methods.

---

## 5. Controlled vs. Uncontrolled Inputs

### What to say
> "A controlled input has its value driven by React state — every keystroke fires onChange,
> which updates state, which re-renders the input with the new value. React is the single
> source of truth. An uncontrolled input lets the DOM manage its own value; you read it
> via a ref when you need it. Controlled is the default recommendation because it keeps
> React state and UI in sync, making validation and programmatic updates trivial."

### When uncontrolled makes sense
- File inputs (`<input type="file">`) — can't be controlled
- Integrating with non-React DOM libraries
- Performance-sensitive forms with hundreds of fields (React Hook Form uses uncontrolled for this reason — no re-render per keystroke)

### The `defaultValue` vs `value` distinction
- `value` → controlled (must provide onChange)
- `defaultValue` → uncontrolled (sets initial value, then DOM takes over)
- Mixing them is a common bug: setting `value` without `onChange` creates a read-only input; React warns about this

### Likely follow-ups
- "How does React Hook Form get better performance than a fully controlled form?"
  → Uses uncontrolled inputs with refs. Only re-renders on submit and validation triggers, not on every keystroke.
- "What's a common bug when switching between controlled and uncontrolled?"
  → Switching from `value={undefined}` to `value="something"` transitions the input from uncontrolled to controlled mid-lifecycle. React warns: "A component is changing an uncontrolled input to be controlled."

---

## 6. React.memo / useMemo / useCallback

### What to say
> "These are all performance optimization tools — the key word is 'optimization': only
> reach for them when you have a measured performance problem, not preemptively.
> React.memo wraps a component to skip re-rendering if its props haven't changed.
> useMemo caches a computed value between renders. useCallback caches a function
> reference between renders — mainly useful when passing callbacks to memoized children."

### When each applies
| Tool | What it memoizes | When to use |
|---|---|---|
| `React.memo` | Component output | Child re-renders due to parent re-renders, props are stable |
| `useMemo` | Computed value | Expensive calculation (sort, filter of large array) |
| `useCallback` | Function reference | Callback passed as prop to a `React.memo` child |

### The trap
`useCallback` alone does nothing unless the receiving component is wrapped in `React.memo`.
Otherwise the child re-renders regardless, and you've just added overhead.

### Likely follow-ups
- "What does React.memo compare? Can you customize it?"
  → Shallow equality of props by default. Pass a second argument: `React.memo(Component, (prev, next) => prev.id === next.id)` returning true means "skip re-render."
- "Is useMemo guaranteed to cache the value?"
  → No. React may discard cached values in low-memory situations (future Forget compiler behavior). Treat it as a hint, not a guarantee.

---

## 7. Error Boundaries

### What to say
> "Error boundaries are class components that catch JavaScript errors anywhere in their
> child tree during rendering, in lifecycle methods, and in constructors. They prevent
> a single component error from crashing the whole app. You define `componentDidCatch`
> and `getDerivedStateFromError` to render a fallback UI instead."

### What they don't catch
- Event handlers (use try/catch inside the handler)
- Async code (useEffect, setTimeout)
- Server-side rendering
- Errors in the error boundary itself

### The pattern
```tsx
class ErrorBoundary extends React.Component {
  state = { hasError: false }
  static getDerivedStateFromError() { return { hasError: true } }
  componentDidCatch(error, info) { logToService(error, info) }
  render() {
    return this.state.hasError ? <FallbackUI /> : this.props.children
  }
}
```

### Likely follow-ups
- "Why can't functional components be error boundaries yet?"
  → No equivalent of getDerivedStateFromError in hooks. This is a known gap — a hooks-based API is planned but not released as of React 18.
- "Where do you place error boundaries in a tree?"
  → Strategically: one at the app root to catch everything, plus more granular ones around independent features so a widget failure doesn't kill the whole page.
