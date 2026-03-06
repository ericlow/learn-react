# Follow-Up Questions — Task Manager (Scenario 1)

Use these after each phase. I'll ask 2-3 of these in chat — answer there. I'll read your code directly and coach based on what I see.

---

## After Phase 1 (Display + Add)

1. **"Why did you put the fetch in useEffect rather than a custom hook?"**
   - Strong answer covers: it was simpler for one component, trade-off is reusability, would extract to `useTasks` when reusing.

2. **"What happens if the user clicks Add twice quickly before the first request returns?"**
   - Strong answer: duplicate optimistic entries, or double POST. Fix: disable button while pending, or use a loading flag.

3. **"How would you handle a network error in the UI?"**
   - Strong answer: catch in .catch(), set error state, show user-facing message, offer retry.

4. **"What's the difference between a controlled and uncontrolled input? Which did you use?"**
   - Strong answer: controlled = React manages value via state + onChange. Uncontrolled = DOM manages it via ref. Controlled is preferred for forms.

---

## After Phase 2 (Filter + Complete + Delete)

1. **"Why did you keep the filter as local state rather than a URL param?"**
   - Strong answer: URL params would make it shareable/bookmarkable. Local state is simpler for practice but loses state on refresh.

2. **"If marking complete fails on the server, what does the user see?"**
   - Strong answer: without optimistic updates, UI waits — janky. With optimistic update, UI changes immediately and rolls back on error.

3. **"What's the complexity of your filter operation? Does it matter here?"**
   - Strong answer: O(n) linear scan. Fine for small lists. For 10k items, consider server-side filtering or memoizing with useMemo.

4. **"How would you test the filter tabs?"**
   - Strong answer: React Testing Library. Render with mock tasks, click 'Active' tab, assert only incomplete tasks shown.

---

## After Phase 3 (useTasks hook + Optimistic Delete)

1. **"What are the rules of hooks, and how do they apply to what you built?"**
   - Strong answer: only call at top level, only in React functions. Custom hooks follow same rules. Can't call conditionally.

2. **"Your `useTasks` hook re-fetches on mount. What if it's used in two components simultaneously?"**
   - Strong answer: two fetches, could be inconsistent. Fix: lift state up, or use a cache layer (React Query, SWR).

3. **"How does optimistic delete improve UX? What are the failure cases?"**
   - Strong answer: instant feedback. Failure: server returns error, need to re-add the item. Race condition: multiple deletes in flight.

4. **"What would you change if this needed to scale to 10,000 tasks?"**
   - Strong answer: server-side pagination + filtering, virtualized list (react-window), avoid storing all 10k in state.

5. **"How would you handle authentication on these API calls?"**
   - Strong answer: add Authorization header in apiFetch, handle 401 with redirect to login, refresh token logic.
