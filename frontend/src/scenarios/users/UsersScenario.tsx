import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { apiFetch } from '../../lib/api'
import type { User } from '../../types'

// ---------------------------------------------------------------------------
// SCENARIO 2 — User Directory
// Read scenarios/users/README.md for the full interview brief.
// ---------------------------------------------------------------------------

export default function UsersScenario() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    apiFetch<User[]>('/users')
      .then(setUsers)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Link to="/" className="text-slate-500 hover:text-slate-300 text-sm">
            &larr; Home
          </Link>
          <h1 className="text-2xl font-bold">User Directory</h1>
          <span className="text-xs bg-slate-800 text-slate-400 px-2 py-1 rounded font-mono">
            /users
          </span>
        </div>

        <div className="mb-4 p-3 rounded-lg border border-amber-800 bg-amber-950 text-amber-300 text-sm">
          Read <code className="font-mono">scenarios/users/README.md</code> for the interview brief
          before starting.
        </div>

        {/* --- YOUR CODE BELOW --- */}

        {loading && <p className="text-slate-400">Loading...</p>}
        {error && <p className="text-red-400">Error: {error}</p>}

        <ul className="space-y-2">
          {users.map((user) => (
            <li
              key={user.id}
              className="flex items-center gap-3 p-3 rounded-lg bg-slate-900 border border-slate-800"
            >
              <div className="w-8 h-8 rounded-full bg-indigo-700 flex items-center justify-center text-xs font-bold shrink-0">
                {user.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-slate-200">{user.name}</div>
                <div className="text-xs text-slate-500">{user.email}</div>
              </div>
              <span className="text-xs text-slate-600">{user.department}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
