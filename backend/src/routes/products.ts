import { Router } from 'express'
import { products } from '../data/seed'

const router = Router()

// GET /products
router.get('/', (_req, res) => {
  res.json(products)
})

// GET /products/:id
router.get('/:id', (req, res) => {
  const product = products.find((p) => p.id === req.params.id)
  if (!product) return res.status(404).json({ error: 'Product not found' })
  return res.json(product)
})

export default router
