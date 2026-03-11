import { useState, useEffect, useReducer } from 'react'
import { Link } from 'react-router-dom'
import { apiFetch } from '../../lib/api'
import type { Product } from '../../types'
import CartSidebar from './CartSidebar'

// ---------------------------------------------------------------------------
// SCENARIO 3 — Shopping Cart
// Read scenarios/cart/README.md for the full interview brief.
// ---------------------------------------------------------------------------
export interface CartItem {
  product: Product
  quantity: number
}

interface Action {
  type: "INCREMENT_ITEM" | "DECREMENT_ITEM" | "REMOVE_ITEM"
  product?: Product
}

function increment_item(cartItems: CartItem[], product?: Product): CartItem[] {
  
  if (!product)     return cartItems;

  const existing = cartItems.find(item => item.product.id === product.id)

  let cart_copy: CartItem[];
  if (existing) {
    cart_copy = (cartItems.map(item => item.product.id === product.id ? {...item, quantity: item.quantity + 1} : item))
  } else {
    cart_copy = ([...cartItems, { product, quantity: 1}])
  }

  return cart_copy;    

}

function remove_item(cartItems:CartItem[], product?: Product): CartItem[] {
  if (!product) return cartItems;

  return cartItems.filter(item => item.product.id != product.id)
}

function decrement_item_qty(cartItems:CartItem[], product?: Product): CartItem[] {
  if (!product) return cartItems;
  // map to update the quantities
  // filter to remove items with 0 qty
  let mapped_cartItems= cartItems.map(item => item.product.id === product.id ? { product: item.product, quantity: item.quantity - 1 } : item );
  let filtered_cartItems = mapped_cartItems.filter(item => item.quantity > 0);
  return filtered_cartItems;
}

function reducer(cartItems:CartItem[], action: Action): CartItem[] {

  switch(action.type) {
    case "INCREMENT_ITEM":
      return increment_item(cartItems, action.product);
    case "DECREMENT_ITEM":
      return decrement_item_qty(cartItems, action.product);
    case "REMOVE_ITEM":
      return remove_item(cartItems, action.product);

  }

  return cartItems
}


export default function CartScenario() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [cartItems, dispatch] = useReducer(reducer,[])

  useEffect(() => {
    setLoading(true)
    apiFetch<Product[]>('/products')
      .then(setProducts)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])
  
  function handleIncrementItemClick(product: Product) {
    dispatch({ type: 'INCREMENT_ITEM', product: product})
  }

  function handleRemoveItemClick(product:Product) {
    dispatch({ type: "REMOVE_ITEM", product: product})
  }

  function handleDecrementQtyClick(product:Product) {
    dispatch({ type: "DECREMENT_ITEM", product: product})
  }



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
                <button onClick={() => handleIncrementItemClick(product)} className="text-xs px-3 py-1 rounded bg-indigo-700 hover:bg-indigo-600 transition-colors">
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </div>

        <CartSidebar 
          handleIncrementItemClick={handleIncrementItemClick}
          handleDecrementQtyClick={handleDecrementQtyClick}
          handleRemoveItemClick={handleRemoveItemClick} 
          cartItems={cartItems}></CartSidebar>
      </div>
    </div>
  )
}
