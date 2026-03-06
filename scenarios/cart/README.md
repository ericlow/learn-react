# Shopping Cart — Interview Simulation

**Route:** `/scenarios/cart` | **Backend:** `GET /products`, `GET /products/:id`

---

## Initial Brief (what the interviewer says)

> "We'd like you to build a shopping cart. Users should be able to browse products and
> manage items they want to buy. Take some time to ask clarifying questions."

---

## Before You Code — Clarifying Questions Phase (~3 min)

Type your clarifying questions in chat before writing any code. I'll answer as the interviewer.

**Things intentionally left vague:**
- Can users add the same item multiple times, or is quantity managed separately?
- Is the cart persisted (localStorage, server) or session-only?
- Should there be a max quantity per item?
- Does the cart need to survive a page refresh?
- Are there any checkout steps, or just the cart UI?

<details>
<summary>Full spec (read only after asking your questions)</summary>

- Fetch products from `GET /products` (array of Product objects)
- Phase 1: Display product grid, "Add to cart" button, cart item count in header
- Phase 2: Cart sidebar showing added items, quantity controls (+/-), remove button, subtotal — managed with useReducer
- Phase 3: Move cart state to React Context so header count and sidebar share it; add a discount code input (server-side validation not required for practice)
- Cart is session-only (no persistence needed)
- Users can add the same item multiple times (increases quantity)
- No max quantity

</details>

---

## Phase 1 — Basic (~10 min target)

**Build:**
- Fetch and display products in a grid: name, description, price, "Add to cart" button
- Track cart as an array of `{ product, quantity }` in local state
- Show cart item count (total quantity) somewhere visible — header badge or fixed button

**[ Chat checkpoint ]** Before coding: type your cart state shape and where it lives. I'll confirm or flag issues.

**[ Chat checkpoint ]** After: type what would break if two components both needed the cart count.

---

## Phase 2 — Intermediate (~25 min target)

**Build:**
- Cart sidebar or panel listing each cart item: name, quantity, unit price, line total
- Quantity controls: "+" increases quantity, "−" decreases (remove item if reaches 0)
- Remove button to remove item entirely
- Subtotal calculated from cart items (not stored in state — derived)
- **Refactor cart state to `useReducer`** with actions: `ADD_ITEM`, `REMOVE_ITEM`, `UPDATE_QUANTITY`, `CLEAR_CART`

**[ Chat checkpoint ]** Before: type your reducer design — actions, state shape, how each action transforms state. I'll ask about anything that seems off.

**[ Chat checkpoint ]** After: type where you drew the line between derived state and stored state, and why.

---

## Phase 3 — Advanced (~25 min target)

**Build:**
- Wrap app in a `CartContext` providing `{ items, dispatch }` (or higher-level methods)
- Both the product grid and the cart sidebar consume context — no prop drilling
- Add a discount code input field (e.g., "SAVE10" = 10% off)
  - Validate the code client-side (hardcode valid codes for practice)
  - Show discounted subtotal when a valid code is applied
  - Show error message for invalid code

**[ Chat checkpoint ]** Before: type when Context is the right choice vs. prop drilling vs. a state library.

**[ Chat checkpoint ]** After: type what you'd do differently with more time. I'll follow up.

---

## Post-Session Debrief

Let me know in chat when you're done. I can read the code directly. I'll give feedback
and ask follow-up questions from `coaching/follow-ups/cart.md`.
