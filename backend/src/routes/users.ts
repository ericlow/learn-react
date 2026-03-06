import { Router } from 'express'
import { users } from '../data/seed'

const router = Router()

// GET /users?page=1&limit=5
router.get('/', (req, res) => {
  const page = parseInt(req.query.page as string ?? '1', 10)
  const limit = parseInt(req.query.limit as string ?? '20', 10)
  const start = (page - 1) * limit
  const slice = users.slice(start, start + limit)
  res.json({
    data: slice,
    total: users.length,
    page,
    limit,
    totalPages: Math.ceil(users.length / limit),
  })
})

// GET /users/:id
router.get('/:id', (req, res) => {
  const user = users.find((u) => u.id === req.params.id)
  if (!user) return res.status(404).json({ error: 'User not found' })
  return res.json(user)
})

// POST /users/check-email
router.post('/check-email', (req, res) => {
  const { email } = req.body as { email?: string }
  if (!email) return res.status(400).json({ error: 'email is required' })
  const exists = users.some((u) => u.email.toLowerCase() === email.toLowerCase())
  return res.json({ available: !exists })
})

export default router
