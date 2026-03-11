import { CartItem } from "./CartScenario"
import { Product } from "../../types"

interface CartSidebarProps {
  cartItems: CartItem[]
  handleIncrementItemClick: (product: Product) => void
  handleRemoveItemClick: (product: Product) => void
  handleDecrementQtyClick: (product: Product) => void
}

  
export default function CartSidebar({ cartItems, handleIncrementItemClick, handleRemoveItemClick, handleDecrementQtyClick }: CartSidebarProps) {

    function getSubtotal() {
    let total = 0;
    for (const cart of cartItems) {
      total = total + cart.quantity * cart.product.price
    }
    return total.toFixed(2);
  }

    return (
        <div id="sidebar">
          {cartItems.map((cartItem) => (
            <div
              key={cartItem.product.id}
              className="p-4 rounded-lg bg-slate-900 border border-slate-800"
            >
              <div className="text-sm font-medium text-slate-200 mb-1">{cartItem.product.name}</div>
              <div className="text-xs text-slate-500 mb-2">{cartItem.product.description}</div>
              <div className="text-xs text-slate-500 mb-2">{cartItem.quantity}</div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-indigo-400">
                  ${(cartItem.product.price * cartItem.quantity).toFixed(2) }
                </span>
                <button onClick={() => handleIncrementItemClick(cartItem.product)} className="text-xs px-3 py-1 rounded bg-indigo-700 hover:bg-indigo-600 transition-colors">
                  Increment Item
                </button>
                <button onClick={() => handleRemoveItemClick(cartItem.product)} className="text-xs px-3 py-1 rounded bg-indigo-700 hover:bg-indigo-600 transition-colors">
                  Remove
                </button>
                <button onClick={() => handleDecrementQtyClick(cartItem.product)} className="text-xs px-3 py-1 rounded bg-indigo-700 hover:bg-indigo-600 transition-colors">
                  Decrement item
                </button>
              </div>
            </div>
          ))}

          <span>Total: {getSubtotal()}</span>
        </div>

    )
}