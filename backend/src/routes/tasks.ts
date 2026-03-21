import { Router } from 'express'
import { tasks, nextId } from '../data/seed'

const router = Router()

// GET /tasks
// TODO: server-side filtering
router.get('/', (_req, res) => {
  res.json(tasks)
})

// POST /tasks
router.post('/', (req, res) => {
  const { title, priority = 'medium' } = req.body as { title?: string, priority: 'low'| 'medium' |'high' }
  if (!title || !title.trim()) {
    return res.status(400).json({ error: 'title is required' })
  }
  const task = {
    id: nextId(),
    title: title.trim(),
    completed: false,
    createdAt: new Date().toISOString(),
    priority: priority
  }
  tasks.push(task)
  return res.status(201).json(task)
})

// PATCH /tasks/:id
router.patch('/:id', (req, res) => {
  const task = tasks.find((t) => t.id === req.params.id)
  if (!task) return res.status(404).json({ error: 'Task not found' })

  const { title, completed, priority = 'medium' } = req.body as { title?: string; completed?: boolean; priority: 'low' | 'medium' | 'high' }
  if (title !== undefined) task.title = title.trim()
  if (completed !== undefined) task.completed = completed
  if (priority !== undefined) task.priority = priority

  return res.json(task)
})

// DELETE /tasks/:id
router.delete('/:id', (req, res) => {
  const idx = tasks.findIndex((t) => t.id === req.params.id)
  if (idx === -1) return res.status(404).json({ error: 'Task not found' })

  tasks.splice(idx, 1)
  return res.status(204).send()
})

export default router
