import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { apiFetch } from '../../lib/api'
import type { Task } from '../../types'

// SCENARIO 1 — Task Manager
// Features to implement:
//   A. Priority field (backend first, then frontend)
//   B. Server-side filtering (backend first, then frontend)

type Filter = 'all' | 'active' | 'done'

export default function TasksScenario() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<Filter>('all')
  const [newTitle, setNewTitle] = useState('')
  const [adding, setAdding] = useState(false)
  const [priority, setPriority] = useState<'low'|'medium'|'high'>('medium')

  // TODO B: send filter to server, re-fetch when filter changes
  useEffect(() => {
    setLoading(true)
    setError(null)
    apiFetch<Task[]>('/tasks')
      .then(setTasks)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  // Client-side filter — remove once Feature B is done
  const visibleTasks = tasks.filter((t) => {
    if (filter === 'active') return !t.completed
    if (filter === 'done') return t.completed
    return true
  })

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    if (!newTitle.trim()) return
    setAdding(true)
    try {
      const created = await apiFetch<Task>('/tasks', {
        method: 'POST',
        body: JSON.stringify({
          title: newTitle.trim(),
          // TODO A: send priority
        }),
      })
      setTasks((prev) => [...prev, created])
      setNewTitle('')
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to add task')
    } finally {
      setAdding(false)
    }
  }

  async function handleToggle(task: Task) {
    try {
      const updated = await apiFetch<Task>(`/tasks/${task.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ completed: !task.completed }),
      })
      setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)))
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to update task')
    }
  }

  async function handleDelete(id: string) {
    try {
      await apiFetch(`/tasks/${id}`, { method: 'DELETE' })
      setTasks((prev) => prev.filter((t) => t.id !== id))
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to delete task')
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link to="/" className="text-slate-500 hover:text-slate-300 text-sm">
            &larr; Home
          </Link>
          <h1 className="text-2xl font-bold">Task Manager</h1>
          <span className="text-xs bg-slate-800 text-slate-400 px-2 py-1 rounded font-mono">
            /tasks
          </span>
        </div>

        {/* Add task form */}
        <form onSubmit={handleAdd} className="flex gap-2 mb-6">
          <input
            className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-slate-500"
            placeholder="New task title…"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          {/* TODO A: priority selector */}
          <button
            type="submit"
            disabled={adding || !newTitle.trim()}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 rounded-lg text-sm font-medium"
          >
            {adding ? 'Adding…' : 'Add'}
          </button>
        </form>

        {/* Filter tabs */}
        <div className="flex gap-1 mb-4">
          {(['all', 'active', 'done'] as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded text-xs font-mono capitalize ${
                filter === f
                  ? 'bg-slate-700 text-slate-100'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Status */}
        {loading && <p className="text-slate-400 text-sm mb-4">Loading…</p>}
        {error && (
          <p className="text-red-400 text-sm mb-4 p-3 rounded-lg bg-red-950 border border-red-800">
            Error: {error}
          </p>
        )}

        {/* Task list */}
        <ul className="space-y-2">
          {visibleTasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center gap-3 p-3 rounded-lg bg-slate-900 border border-slate-800"
            >
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggle(task)}
                className="accent-indigo-500 w-4 h-4 cursor-pointer"
              />
              <span
                className={`flex-1 text-sm ${
                  task.completed ? 'line-through text-slate-500' : 'text-slate-200'
                }`}
              >
                {task.title}
              </span>

              {/* TODO A: priority badge */}

              <button
                onClick={() => handleDelete(task.id)}
                className="text-slate-600 hover:text-red-400 text-xs font-mono ml-2"
              >
                delete
              </button>
            </li>
          ))}
        </ul>

        {!loading && visibleTasks.length === 0 && (
          <p className="text-slate-600 text-sm mt-4">No tasks to show.</p>
        )}
      </div>
    </div>
  )
}
