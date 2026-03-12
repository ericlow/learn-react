import type { CartItem } from "./CartScenario"
import type { Product } from "../../types"
import { CartContext } from "./CartContext";
import { useContext, useState } from "react";
 
export default function CartSidebar() {
    const [ inputValue, setInputValue] = useState('')
    const [ discountCodeResult, setDiscountCodeResult] = useState<string>("")
    const [ discountCodes, setDiscountCodes] = useState<string[]>([])
    const { cartItems, dispatch } = useContext(CartContext)!
    
    function handleIncrementItemClick(product: Product) {
      dispatch( {type: "INCREMENT_ITEM", product: product } )
    }

    function handleRemoveItemClick(product: Product) {
      dispatch( {type: "REMOVE_ITEM" , product: product } )
    }

    function handleDecrementQtyClick(product: Product) {
      dispatch( {type: "DECREMENT_ITEM", product: product } )
    }

    const discountCodeLookup = new Map<string, number>([
      ["DISCOUNT10",.1],
      ["DISCOUNT20",.2]
    ])

    function handleDiscountCodeSubmit() {
      if (discountCodeLookup.has(inputValue)) {

        const exists = discountCodes.find(code => code === inputValue)
        if (exists) {
          // message exists already
          setDiscountCodeResult("Discount Code Already Applied")
        } else {
          const discountPct = discountCodeLookup.get(inputValue);
          // message accepted
          setDiscountCodes([...discountCodes, inputValue])
          setDiscountCodeResult("Accepted!")
        }
      } else {
        // message discount code not accepted
          setDiscountCodeResult("Code Not Found")
      }
      setInputValue("")
    }

    function getSubtotal() {
      let total = 0;
      for (const cart of cartItems) {
        total = total + cart.quantity * cart.product.price
      }

      for (const code of discountCodes) {
          const discount = discountCodeLookup.get(code);
          if (discount)
            total = total * (1-discount)
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
          <div>
            <label>Discount Code:</label>
            <input id="DiscountInput" type="text" value={inputValue} 
            onChange={(e) => setInputValue(e.target.value)}
            className="text-slate-100 bg-slate-700"
            />
            <button onClick={ () => handleDiscountCodeSubmit() }>submit</button>
            <label> {discountCodeResult} </label>
          </div>
          <span>SubTotal: {getSubtotal()}</span>
        </div>

    )
}