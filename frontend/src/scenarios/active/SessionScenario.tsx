import { Link } from 'react-router-dom'

// ---------------------------------------------------------------------------
// ACTIVE SESSION — Claude rewrites this file at the start of each session.
// Do not edit manually. See sessions/history.json for session details.
// ---------------------------------------------------------------------------

export default function SessionScenario() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Link to="/" className="text-slate-500 hover:text-slate-300 text-sm">
            &larr; Home
          </Link>
          <h1 className="text-2xl font-bold">Active Session</h1>
        </div>
        <div className="p-6 rounded-xl border border-slate-700 bg-slate-900 text-slate-400 text-sm">
          No active session. Ask Claude to start a new session.
        </div>
      </div>
    </div>
  )
}
