import { Link } from 'react-router-dom'

const scenarios = [
  {
    id: 'tasks',
    title: 'Task Manager',
    path: '/scenarios/tasks',
    backend: '/tasks',
    description: 'CRUD with controlled forms, filtering, custom hooks, optimistic updates',
    phases: ['Display tasks, add new tasks', 'Filter tabs, mark complete, delete', 'useTasks hook, optimistic delete'],
    tests: ['useState', 'CRUD', 'controlled forms', 'custom hooks', 'optimistic updates'],
  },
  {
    id: 'users',
    title: 'User Directory',
    path: '/scenarios/users',
    backend: '/users',
    description: 'Data fetching, loading/error states, search+debounce, useEffect cleanup, pagination',
    phases: ['Fetch users, loading/error states', 'Client-side search with debounce, detail panel', 'useFetch<T> hook, paginated calls'],
    tests: ['data fetching', 'loading/error states', 'debounce', 'useEffect cleanup', 'pagination'],
  },
  {
    id: 'cart',
    title: 'Shopping Cart',
    path: '/scenarios/cart',
    backend: '/products',
    description: 'useReducer, computed state, Context API',
    phases: ['Display products, add to cart', 'Cart sidebar, quantities, useReducer', 'Context API, discount codes'],
    tests: ['useReducer', 'computed state', 'Context API'],
  },
  {
    id: 'form',
    title: 'Form Wizard',
    path: '/scenarios/form',
    backend: '/users/check-email',
    description: 'Multi-step forms, controlled inputs, validation, async validation',
    phases: ['Two-step form, required-field validation', 'Async email check, inline errors', 'Dynamic steps, review/confirm'],
    tests: ['multi-step forms', 'controlled inputs', 'validation', 'async validation'],
  },
  {
    id: 'feed',
    title: 'Live Feed',
    path: '/scenarios/feed',
    backend: '/tasks',
    description: 'useEffect cleanup, polling, optimistic UI, performance',
    phases: ['Poll /tasks every 5s', 'Pause on tab hidden, manual refresh', 'WebSocket, optimistic post'],
    tests: ['useEffect cleanup', 'polling', 'optimistic UI', 'performance'],
  },
]

const debugScenario = {
  id: 'debug',
  title: 'Spot the Bug',
  path: '/scenarios/debug',
  description: '5 broken components — diagnose the bug verbally, then fix it in the source. Mirrors the CoderPad "identify and fix" format.',
  bugs: [
    'Interval leak (missing cleanup)',
    'Stale state update (missing functional form)',
    'Object in deps (infinite loop)',
    'Stale useEffect dep (missing dep)',
    'Index as list key (reconciliation bug)',
  ],
}

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-white mb-2">React Interview Prep</h1>
          <p className="text-slate-400 text-sm">
            Practice scenarios (3-phase React) &bull; Sessions (4-phase full-stack) &bull; coaching in{' '}
            <code className="bg-slate-800 px-1 rounded text-slate-300">coaching/</code>
          </p>
          <p className="text-slate-500 text-xs mt-2">
            Use the <span className="text-slate-300">Timer</span> widget (bottom-right) to track
            phase time. Backend runs at{' '}
            <code className="bg-slate-800 px-1 rounded text-slate-300">localhost:3001</code> with
            ~300ms artificial latency.
          </p>
        </div>

        {/* Active Session */}
        <div className="mb-6 rounded-xl border border-indigo-800 bg-indigo-950 p-5 hover:border-indigo-600 transition-colors">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-semibold text-white mb-1">Active Session</h2>
              <p className="text-indigo-300 text-sm">Ask Claude to start a session, then open the exercise here.</p>
            </div>
            <Link
              to="/session"
              className="shrink-0 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors"
            >
              Open
            </Link>
          </div>
        </div>

        <div className="grid gap-5">
          {scenarios.map((s, i) => (
            <div
              key={s.id}
              className="rounded-xl border border-slate-800 bg-slate-900 p-5 hover:border-slate-600 transition-colors"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-xs font-mono text-slate-500">#{i + 1}</span>
                    <h2 className="text-lg font-semibold text-white">{s.title}</h2>
                    <code className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded">
                      {s.backend}
                    </code>
                  </div>
                  <p className="text-slate-400 text-sm">{s.description}</p>
                </div>
                <Link
                  to={s.path}
                  className="shrink-0 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors"
                >
                  Open
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-2 mb-3">
                {s.phases.map((phase, pi) => (
                  <div key={pi} className="text-xs bg-slate-800 rounded p-2">
                    <span className="text-slate-500 font-mono">P{pi + 1} </span>
                    <span className="text-slate-300">{phase}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-1">
                {s.tests.map((t) => (
                  <span
                    key={t}
                    className="text-xs bg-slate-800 text-slate-500 px-2 py-0.5 rounded-full"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Debug scenario — different card style */}
        <div className="mt-4 rounded-xl border border-red-900 bg-slate-900 p-5 hover:border-red-700 transition-colors">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <span className="text-xs font-mono text-red-600">debug</span>
                <h2 className="text-lg font-semibold text-white">{debugScenario.title}</h2>
                <span className="text-xs bg-red-900 text-red-300 px-2 py-0.5 rounded">
                  no backend
                </span>
              </div>
              <p className="text-slate-400 text-sm">{debugScenario.description}</p>
            </div>
            <Link
              to={debugScenario.path}
              className="shrink-0 px-4 py-2 rounded-lg bg-red-800 hover:bg-red-700 text-white text-sm font-medium transition-colors"
            >
              Open
            </Link>
          </div>
          <div className="flex flex-wrap gap-1">
            {debugScenario.bugs.map((b) => (
              <span
                key={b}
                className="text-xs bg-slate-800 text-slate-500 px-2 py-0.5 rounded-full"
              >
                {b}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-8 text-xs text-slate-600 text-center">
          Read <code className="text-slate-500">coaching/what-to-say.md</code> + <code className="text-slate-500">coaching/concepts.md</code> before your first
          session &bull; See <code className="text-slate-500">scenarios/[name]/README.md</code> for
          the full interview brief
        </div>
      </div>
    </div>
  )
}
