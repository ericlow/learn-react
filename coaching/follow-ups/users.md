# Follow-Up Questions — User Directory (Scenario 2)

---

## After Phase 1 (Fetch + Loading/Error States)

1. **"You have three states: loading, error, data. Can they overlap? How do you prevent invalid states?"**
   - Strong answer: loading=true + data present = stale data shown during refetch (valid). loading + error = rare. Use discriminated union type for correctness: `{ status: 'loading' | 'error' | 'success', data?, error? }`.

2. **"Why does the empty dependency array `[]` in useEffect only run on mount?"**
   - Strong answer: React compares deps on each render. Empty array never changes, so effect never re-runs. Intentional for one-time fetch.

3. **"What's the difference between showing a spinner vs skeleton UI? Which did you choose and why?"**
   - Strong answer: spinner = simple, blocks layout. Skeleton = mirrors final layout, better perceived performance. Trade-off: skeleton requires more code.

4. **"When should you use `async/await` vs `.then()` chains in useEffect?"**
   - Strong answer: can't make useEffect callback async directly. Either use inner async function, or .then() chain. Both work — prefer async/await for readability.

---

## After Phase 2 (Search + Debounce + Detail Panel)

1. **"Why do you debounce the search input? What's the downside of not debouncing?"**
   - Strong answer: without debounce, fires on every keystroke — O(n) filter or API call per character. Debounce delays until typing pauses.

2. **"What cleanup does your useEffect need when the component unmounts mid-search?"**
   - Strong answer: clearTimeout in cleanup to cancel pending debounce. If making API calls, need to cancel in-flight requests with AbortController.

3. **"Your search is client-side. When would you move it server-side?"**
   - Strong answer: when dataset is too large to load fully. Server-side: query param `?search=`, hit API, show results. Client-side: simple, no latency, no extra requests.

4. **"How does the detail panel affect your state model? What if you click two users quickly?"**
   - Strong answer: selectedUser state. Second click replaces first — fine if synchronous. If fetching detail async, need to cancel/ignore stale responses.

---

## After Phase 3 (useFetch<T> + Pagination)

1. **"How does TypeScript generics make `useFetch<T>` safe? What would break if you removed the generic?"**
   - Strong answer: generic makes returned data typed. Without it, you'd get `unknown` or `any`, losing type safety at callsite.

2. **"What's the difference between client-side pagination and server-side pagination?"**
   - Strong answer: client-side: fetch all, slice locally. Server-side: page param to API, only fetch current page. Server-side needed for large datasets.

3. **"How would you handle loading state when navigating pages?"**
   - Strong answer: show spinner on page change, keep previous page visible until new data arrives (or replace immediately). React Query does this automatically.

4. **"What happens to your custom hook if the URL changes? Will it refetch?"**
   - Strong answer: depends on dependency array. If URL is a dep, yes. Demonstrate awareness of stale closure issue.
