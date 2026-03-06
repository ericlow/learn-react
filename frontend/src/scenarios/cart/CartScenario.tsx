import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { apiFetch } from '../../lib/api'
import type { Product } from '../../types'

// ---------------------------------------------------------------------------
// SCENARIO 3 — Shopping Cart
// Read scenarios/cart/README.md for the full interview brief.
// ---------------------------------------------------------------------------

export default function CartScenario() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    apiFetch<Product[]>('/products')
      .then(setProducts)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Link to="/" className="text-slate-500 hover:text-slate-300 text-sm">
            &larr; Home
          </Link>
          <h1 className="text-2xl font-bold">Shopping Cart</h1>
          <span className="text-xs bg-slate-800 text-slate-400 px-2 py-1 rounded font-mono">
            /products
          </span>
        </div>

        <div className="mb-4 p-3 rounded-lg border border-amber-800 bg-amber-950 text-amber-300 text-sm">
          Read <code className="font-mono">scenarios/cart/README.md</code> for the interview brief
          before starting.
        </div>

        {/* --- YOUR CODE BELOW --- */}

        {loading && <p className="text-slate-400">Loading...</p>}
        {error && <p className="text-red-400">Error: {error}</p>}

        <div className="grid grid-cols-2 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="p-4 rounded-lg bg-slate-900 border border-slate-800"
            >
              <div className="text-sm font-medium text-slate-200 mb-1">{product.name}</div>
              <div className="text-xs text-slate-500 mb-2">{product.description}</div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-indigo-400">
                  ${product.price.toFixed(2)}
                </span>
                <button className="text-xs px-3 py-1 rounded bg-indigo-700 hover:bg-indigo-600 transition-colors">
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
