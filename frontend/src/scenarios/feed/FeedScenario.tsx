import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { apiFetch } from '../../lib/api'
import type { Task } from '../../types'

// ---------------------------------------------------------------------------
// SCENARIO 5 — Live Feed
// Read scenarios/feed/README.md for the full interview brief.
// Backend: GET /tasks (poll every 5s)
// ---------------------------------------------------------------------------

const POLL_INTERVAL = 5000

export default function FeedScenario() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  function fetchTasks() {
    apiFetch<Task[]>('/tasks').then((data) => {
      setTasks(data)
      setLastUpdated(new Date())
    })
  }

  useEffect(() => {
    fetchTasks()
    intervalRef.current = setInterval(fetchTasks, POLL_INTERVAL)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Link to="/" className="text-slate-500 hover:text-slate-300 text-sm">
            &larr; Home
          </Link>
          <h1 className="text-2xl font-bold">Live Feed</h1>
          <span className="text-xs bg-slate-800 text-slate-400 px-2 py-1 rounded font-mono">
            /tasks
          </span>
        </div>

        <div className="mb-4 p-3 rounded-lg border border-amber-800 bg-amber-950 text-amber-300 text-sm">
          Read <code className="font-mono">scenarios/feed/README.md</code> for the interview brief
          before starting.
        </div>

        {/* --- YOUR CODE BELOW --- */}

        <div className="flex items-center justify-between mb-4">
          <div className="text-xs text-slate-500">
            Polling every {POLL_INTERVAL / 1000}s
            {lastUpdated && (
              <span> &bull; last updated {lastUpdated.toLocaleTimeString()}</span>
            )}
          </div>
          <button
            onClick={fetchTasks}
            className="text-xs px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            Refresh
          </button>
        </div>

        <ul className="space-y-2">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center gap-3 p-3 rounded-lg bg-slate-900 border border-slate-800"
            >
              <div
                className={`w-2 h-2 rounded-full shrink-0 ${task.completed ? 'bg-green-500' : 'bg-slate-600'}`}
              />
              <span
                className={`flex-1 text-sm ${task.completed ? 'line-through text-slate-500' : 'text-slate-200'}`}
              >
                {task.title}
              </span>
              <span className="text-xs text-slate-600 font-mono">
                {new Date(task.createdAt).toLocaleTimeString()}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
