import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { apiFetch } from '../../lib/api'
import type { Task } from '../../types'

// ---------------------------------------------------------------------------
// SCENARIO 1 — Task Manager
// Read scenarios/tasks/README.md for the full interview brief.
// ---------------------------------------------------------------------------

export default function TasksScenario() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    apiFetch<Task[]>('/tasks')
      .then(setTasks)
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
          <h1 className="text-2xl font-bold">Task Manager</h1>
          <span className="text-xs bg-slate-800 text-slate-400 px-2 py-1 rounded font-mono">
            /tasks
          </span>
        </div>

        <div className="mb-4 p-3 rounded-lg border border-amber-800 bg-amber-950 text-amber-300 text-sm">
          Read <code className="font-mono">scenarios/tasks/README.md</code> for the interview brief
          before starting.
        </div>

        {/* --- YOUR CODE BELOW --- */}

        {loading && <p className="text-slate-400">Loading...</p>}
        {error && <p className="text-red-400">Error: {error}</p>}

        <ul className="space-y-2">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center gap-3 p-3 rounded-lg bg-slate-900 border border-slate-800"
            >
              <span
                className={`flex-1 text-sm ${task.completed ? 'line-through text-slate-500' : 'text-slate-200'}`}
              >
                {task.title}
              </span>
              {task.completed && (
                <span className="text-xs text-green-600 font-mono">done</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
