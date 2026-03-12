import type { CartItem } from "./CartScenario"
import type { Product } from "../../types"
import { createContext } from "react"
import { Dispatch } from "react"
import { Action } from "./CartScenario"

interface CartContextType {
      cartItems: CartItem[]
      dispatch: Dispatch<Action>
}

export const CartContext = createContext<CartContextType | null> (null)
