# Follow-Up Questions — Live Feed (Scenario 5)

---

## After Phase 1 (Polling Every 5s)

1. **"Why do you need to clear the interval in the useEffect cleanup?"**
   - Strong answer: without cleanup, interval keeps firing after component unmounts — memory leak, potential state update on unmounted component (React warning/bug). Cleanup = `clearInterval(id)`.

2. **"What happens if the user navigates away mid-poll? Describe the sequence of events."**
   - Strong answer: component unmounts → cleanup runs → interval cleared → no more fetches. If cleanup is missing: interval fires, fetch completes, setState called on unmounted component.

3. **"setInterval vs setTimeout recursion — what's the difference?"**
   - Strong answer: setInterval fires on fixed cadence regardless of request duration. Recursive setTimeout fires N ms *after* previous completes — prevents overlapping requests. setTimeout is usually better for polling.

4. **"How accurate is setInterval for a 5-second poll?"**
   - Strong answer: not precise. Browser can throttle timers (especially in background tabs). Timer drift accumulates. Fine for non-critical polling.

---

## After Phase 2 (Pause on Tab Hidden + Manual Refresh)

1. **"How did you detect tab visibility? What API did you use?"**
   - Strong answer: `document.addEventListener('visibilitychange')`, check `document.hidden` or `document.visibilityState`. Cleanup: remove listener on unmount.

2. **"Why does pausing on tab hidden matter beyond UX? Think network/server."**
   - Strong answer: reduces unnecessary requests when user isn't looking. Saves server load. Important for mobile (battery). Especially matters with many users.

3. **"What's the difference between `useRef` and `useState` for storing the interval ID?"**
   - Strong answer: interval ID doesn't affect render output — useRef is correct. useState would cause unnecessary re-renders on set. useRef stores mutable value without triggering re-render.

4. **"How would you add a visual indicator that polling is paused?"**
   - Strong answer: state variable `isPaused`, show "Paused (tab hidden)" badge. Toggle on visibilitychange.

---

## After Phase 3 (WebSocket + Optimistic Post)

1. **"How does WebSocket differ from HTTP polling? What are the trade-offs?"**
   - Strong answer: WebSocket = persistent bidirectional connection, real-time push. Polling = periodic pull, simpler infrastructure, higher latency, wasted requests. WS: better UX, more complex server, more connections to manage.

2. **"Where do you put the WebSocket connection? Why not in the component body?"**
   - Strong answer: in useEffect with cleanup. Component body runs on every render — would create new connection each render. useEffect with `[]` runs once on mount.

3. **"What is optimistic UI? What are the failure cases you must handle?"**
   - Strong answer: update UI immediately before server confirms. Failure cases: server rejects (validation error), network fails, race condition with concurrent updates. Must roll back or show error on failure.

4. **"How do you prevent duplicate items when the WebSocket confirms a post you already added optimistically?"**
   - Strong answer: use a temp ID for optimistic item, replace with server-assigned ID on confirmation. Or use a Set of pending IDs to deduplicate.

5. **"What happens to your WebSocket when the user's connection drops?"**
   - Strong answer: need reconnection logic — exponential backoff, max retries. Check `ws.readyState`. Show "reconnecting..." indicator. Fall back to polling if WS unavailable.
