# Skills Roadmap

## JS Fundamentals

| Topic | What to Know |
|---|---|
| Closures | Variable capture, practical use in callbacks and factory functions |
| `this` | How context changes by call site; arrow vs regular functions |
| Event loop | Call stack, task queue, microtask queue; why `setTimeout(fn, 0)` isn't instant |
| Prototypal inheritance | `__proto__`, `Object.create`, class syntax as sugar |
| async/await gotchas | `await` inside `forEach` doesn't work — use `for...of` or `Promise.all` |

---

## React Core Concepts

| Topic | What to Know |
|---|---|
| Reconciliation | How React diffs the virtual DOM; why keys matter |
| useEffect deps | Stale closures, missing deps, object/array identity traps |
| setState is async | Batching, functional updates (`prev =>`), why you can't read state immediately after set |
| useMemo vs useCallback | `useMemo` caches a value, `useCallback` caches a function; skip both unless you have a measured perf problem |
| Controlled components | Input value tied to state; uncontrolled = ref-based |
| Keys in lists | Must be stable + unique; index-as-key breaks on reorder/delete |

---

## Practical Prep

- Build something real: API calls, loading states, error states, empty states
- Practice explaining your decisions out loud as you code
- Know how to handle race conditions (e.g. stale fetch results)

---

## React

| Beginner | Intermediate | Advanced |
|---|---|---|
| useState | useReducer | Custom hooks |
| useEffect (fetch on mount) | useContext / createContext | useMemo / useCallback |
| JSX basics | Controlled inputs | React.memo |
| Props / prop drilling | Component extraction | Error Boundaries |
| Conditional rendering | Array rendering with keys | Code splitting / lazy |
| Event handlers | useEffect cleanup | Suspense |

---

## Node / Express

| Beginner | Intermediate | Advanced |
|---|---|---|
| Define routes (GET/POST) | async/await in handlers | Auth middleware (JWT) |
| req.params / query / body | try/catch error handling | Global error handler |
| res.json() / status codes | Input validation | Database integration |
| In-memory data | Middleware / next() | Rate limiting / CORS |
| | Route organization | Environment config |

---

## TypeScript

| Beginner | Intermediate | Advanced |
|---|---|---|
| interface / type | Generics (`useFetch<T>`) | Discriminated unions |
| Basic annotations | Optional chaining | Utility types (Partial, Pick) |
| Array types | Type narrowing | Declaration merging |
