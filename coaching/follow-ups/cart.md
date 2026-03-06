# Follow-Up Questions — Shopping Cart (Scenario 3)

---

## After Phase 1 (Product List + Add to Cart)

1. **"You used useState for cart items. At what point would you switch to useReducer?"**
   - Strong answer: when you have multiple related state updates triggered by a single action (add, remove, update quantity, clear). useReducer centralizes that logic.

2. **"How do you derive the cart item count? Is it a state variable or computed?"**
   - Strong answer: computed from cart array — `cart.reduce((sum, item) => sum + item.quantity, 0)`. Storing it as separate state creates sync bugs.

3. **"What does 'lifting state up' mean, and why does the cart need it?"**
   - Strong answer: moving state to a common ancestor so multiple components share it. Cart state lives in parent (or Context) because both ProductList and CartSidebar need it.

---

## After Phase 2 (Cart Sidebar + Quantities + useReducer)

1. **"Walk me through your reducer. What are the actions and state shape?"**
   - Strong answer: should articulate `{ items: CartItem[] }` and actions like `ADD_ITEM`, `REMOVE_ITEM`, `UPDATE_QUANTITY`. Explain how each action transforms state.

2. **"What's the difference between useReducer and Redux?"**
   - Strong answer: useReducer is built-in React, local to component. Redux is global, has middleware, devtools, time-travel debugging. useReducer is good for local complex state; Redux for app-wide.

3. **"How do you calculate the subtotal? Should it be in the reducer or computed at render?"**
   - Strong answer: computed at render from cart items — `items.reduce((sum, item) => sum + item.price * item.quantity, 0)`. Keep reducer state minimal.

4. **"What if the user has the cart open on two tabs? How do you handle that?"**
   - Strong answer: each tab has independent state. Could sync with localStorage via storage event, or use server-side cart. Depends on requirements.

---

## After Phase 3 (Context API + Discount Codes)

1. **"When does Context cause performance problems? How do you fix it?"**
   - Strong answer: all consumers re-render on any context value change. Fix: split contexts (CartContext, UIContext), memoize context value with useMemo, or use useSyncExternalStore.

2. **"How does `useContext` differ from prop drilling?"**
   - Strong answer: prop drilling threads props through every level. Context jumps directly from provider to consumer. Context trade-off: harder to trace data flow, over-abstraction risk.

3. **"How would you validate a discount code securely?"**
   - Strong answer: NEVER client-side only — users can bypass. Validate on server, return discounted price from API. Client-side can show UX feedback but server enforces.

4. **"If you needed to persist the cart across page refreshes, what would you do?"**
   - Strong answer: localStorage (simple, sync), sessionStorage (tab-only), server-side cart with auth, or a combination. Serialize/deserialize on mount/update.
