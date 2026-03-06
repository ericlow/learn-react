import express from 'express'
import cors from 'cors'
import { delay } from './middleware/delay'
import tasksRouter from './routes/tasks'
import usersRouter from './routes/users'
import productsRouter from './routes/products'
import sessionRouter from './routes/session'

const app = express()
const PORT = process.env.PORT ?? 3001

app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json())
app.use(delay)

app.use('/tasks', tasksRouter)
app.use('/users', usersRouter)
app.use('/products', productsRouter)
app.use('/session', sessionRouter)

app.get('/health', (_req, res) => res.json({ ok: true }))

app.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`)
})
