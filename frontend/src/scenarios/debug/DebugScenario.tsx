import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

// ---------------------------------------------------------------------------
// SPOT THE BUG — 5 broken components. Find and fix each one.
// Read scenarios/debug/README.md for the full brief + answers.
//
// Instructions:
//   1. Read the "What it should do" comment above each component
//   2. Run it and observe the broken behavior
//   3. Say the bug out loud before touching the code
//   4. Fix it, confirm it works, then check the README answer
// ---------------------------------------------------------------------------

// ─── BUG 1: Interval Leak ────────────────────────────────────────────────────
// What it should do: increment a counter every second.
// Symptom: navigate away and back — the counter accelerates with each visit.
function BugIntervalLeak() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setCount((c) => c + 1), 1000)
    // TODO: fix this
    void id
  }, [])

  return (
    <div className="font-mono text-2xl text-white">
      {count}
      <span className="text-xs text-slate-500 ml-3">ticks/s should stay at 1</span>
    </div>
  )
}

// ─── BUG 2: Stale State Update ───────────────────────────────────────────────
// What it should do: clicking "+2" adds exactly 2 to the counter.
// Symptom: only adds 1 no matter how many times the internal increment runs.
function BugStaleUpdate() {
  const [count, setCount] = useState(0)

  function handleClick() {
    setCount(count + 1)
    setCount(count + 1) // TODO: why does this not add 2? fix it.
  }

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={handleClick}
        className="px-4 py-2 rounded bg-indigo-700 hover:bg-indigo-600 text-white text-sm"
      >
        +2
      </button>
      <span className="font-mono text-xl text-white">{count}</span>
      <span className="text-xs text-slate-500">(should increment by 2 per click)</span>
    </div>
  )
}

// ─── BUG 3: Object in useEffect Deps ─────────────────────────────────────────
// ⚠️  NOT rendered — would cause infinite network requests.
// Read the broken code below and diagnose it mentally / verbally.
//
// function BugObjectDeps({ userId }: { userId: string }) {
//   const [data, setData] = useState(null)
//   const options = { sort: 'asc', limit: 10 }   // new object on every render
//   useEffect(() => {
//     apiFetch(`/users/${userId}`, options).then(setData)
//   }, [userId, options])  // options triggers re-render → loop
// }

// ─── BUG 4: Stale useEffect Dependency ───────────────────────────────────────
// What it should do: fetch and show the user for the selected userId.
//                    Changing the selection should re-fetch.
// Symptom: always shows the first user; changing the selector has no effect.
const MOCK_USERS: Record<string, { name: string; role: string }> = {
  '1': { name: 'Alice Chen', role: 'Engineer' },
  '2': { name: 'Bob Martinez', role: 'Designer' },
  '3': { name: 'Carol Williams', role: 'Manager' },
}

function BugStaleDep() {
  const [userId, setUserId] = useState('1')
  const [user, setUser] = useState<{ name: string; role: string } | null>(null)

  useEffect(() => {
    // Simulated fetch — pretend this hits /users/:userId
    setTimeout(() => setUser(MOCK_USERS[userId] ?? null), 200)
  }, []) // TODO: fix the dependency array

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        {Object.keys(MOCK_USERS).map((id) => (
          <button
            key={id}
            onClick={() => setUserId(id)}
            className={`px-3 py-1 rounded text-sm ${userId === id ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
          >
            User {id}
          </button>
        ))}
      </div>
      {user ? (
        <div className="text-sm text-slate-200">
          <span className="font-medium">{user.name}</span>
          <span className="text-slate-500 ml-2">{user.role}</span>
        </div>
      ) : (
        <p className="text-slate-500 text-sm">Loading...</p>
      )}
      <p className="text-xs text-slate-600">(clicking different users should update the display)</p>
    </div>
  )
}

// ─── BUG 5: Index as List Key ─────────────────────────────────────────────────
// What it should do: clicking "Prepend" adds a new item at the top.
//                    Existing inputs should keep whatever the user typed in them.
// Symptom: type into an input, prepend — the new item inherits your typed value.
let nextId = 100
function BugIndexKey() {
  const [items, setItems] = useState([
    { id: 1, label: 'Apple' },
    { id: 2, label: 'Banana' },
    { id: 3, label: 'Cherry' },
  ])

  function prepend() {
    setItems((prev) => [{ id: nextId++, label: `Item ${nextId}` }, ...prev])
  }

  return (
    <div className="space-y-2">
      <button
        onClick={prepend}
        className="px-3 py-1 rounded bg-slate-700 hover:bg-slate-600 text-white text-sm"
      >
        Prepend item
      </button>
      <p className="text-xs text-slate-600">
        Type in an input below, then prepend — watch where your text ends up.
      </p>
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2"> {/* TODO: fix the key */}
          <span className="text-xs text-slate-500 w-16 font-mono">{item.label}</span>
          <input
            defaultValue={item.label}
            className="bg-slate-800 border border-slate-700 rounded px-2 py-1 text-sm text-white w-40 focus:outline-none focus:border-indigo-500"
          />
        </div>
      ))}
    </div>
  )
}

// ─── Shell ─────────────────────────────────────────────────────────────────────

const bugs = [
  {
    id: 1,
    title: 'Interval Leak',
    concepts: ['useEffect cleanup', 'setInterval'],
    component: <BugIntervalLeak />,
    instruction:
      'Navigate away (Home) and back several times. The counter should tick at 1/s — does it?',
  },
  {
    id: 2,
    title: 'Stale State Update',
    concepts: ['functional state update', 'batching'],
    component: <BugStaleUpdate />,
    instruction: 'Click "+2" repeatedly. Should always add 2 — does it?',
  },
  {
    id: 3,
    title: 'Object in useEffect Deps',
    concepts: ['referential equality', 'dependency array', 'infinite loop'],
    component: null,
    instruction:
      'This one is NOT rendered (it would infinite-loop the page). Read the commented-out code in the source file and diagnose it verbally.',
  },
  {
    id: 4,
    title: 'Stale useEffect Dependency',
    concepts: ['dependency array', 'stale closure', 'AbortController'],
    component: <BugStaleDep />,
    instruction: 'Click each user button. The displayed name should update — does it?',
  },
  {
    id: 5,
    title: 'Index as List Key',
    concepts: ['reconciliation', 'keys', 'uncontrolled inputs'],
    component: <BugIndexKey />,
    instruction:
      'Type something into the first input, then click "Prepend item". What happens to what you typed?',
  },
]

export default function DebugScenario() {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [revealed, setRevealed] = useState<Set<number>>(new Set())

  function toggleReveal(id: number) {
    setRevealed((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  // Clean up any pending timers when this page unmounts
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Link to="/" className="text-slate-500 hover:text-slate-300 text-sm">
            &larr; Home
          </Link>
          <h1 className="text-2xl font-bold">Spot the Bug</h1>
          <span className="text-xs bg-red-900 text-red-300 px-2 py-1 rounded font-mono">
            5 bugs
          </span>
        </div>

        <div className="mb-6 p-3 rounded-lg border border-amber-800 bg-amber-950 text-amber-300 text-sm">
          Read <code className="font-mono">scenarios/debug/README.md</code> for the full brief,
          answers, and follow-up questions.
        </div>

        <div className="space-y-8">
          {bugs.map((bug) => (
            <div key={bug.id} className="rounded-xl border border-slate-800 bg-slate-900 p-5">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-red-500">Bug #{bug.id}</span>
                    <h2 className="text-base font-semibold text-white">{bug.title}</h2>
                  </div>
                  <p className="text-slate-400 text-sm">{bug.instruction}</p>
                </div>
                <button
                  onClick={() => toggleReveal(bug.id)}
                  className="shrink-0 text-xs px-3 py-1.5 rounded border border-slate-700 text-slate-400 hover:text-slate-200 hover:border-slate-500 transition-colors"
                >
                  {revealed.has(bug.id) ? 'Hide hint' : 'Show hint'}
                </button>
              </div>

              <div className="flex flex-wrap gap-1 mb-4">
                {bug.concepts.map((c) => (
                  <span
                    key={c}
                    className="text-xs bg-slate-800 text-slate-500 px-2 py-0.5 rounded-full"
                  >
                    {c}
                  </span>
                ))}
              </div>

              {revealed.has(bug.id) && (
                <div className="mb-4 p-3 rounded-lg bg-slate-800 border border-slate-700 text-xs text-slate-400">
                  Hint: check <code className="text-slate-300">scenarios/debug/README.md</code>{' '}
                  → Bug #{bug.id} for the full explanation and fix.
                </div>
              )}

              {bug.component !== null ? (
                <div className="p-4 rounded-lg bg-slate-950 border border-slate-800">
                  {bug.component}
                </div>
              ) : (
                <div className="p-4 rounded-lg bg-slate-950 border border-dashed border-slate-700 text-slate-600 text-sm italic">
                  Not rendered — read the commented-out code in DebugScenario.tsx (Bug 3 section)
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
