# Follow-Up Questions — Form Wizard (Scenario 4)

---

## After Phase 1 (Two-Step Form + Validation)

1. **"How does your validation work? Where does the validation logic live?"**
   - Strong answer: inline validate function called on Next/Submit. Returns error object. Could be extracted to a pure function for testing. Trade-off: simple vs. schema-based (zod, yup).

2. **"What's the difference between validating on blur vs. on submit?"**
   - Strong answer: blur = immediate feedback as user leaves field (aggressive). Submit = batch feedback on attempt (less interrupting). Hybrid: validate on blur after first submit attempt.

3. **"How do you keep form state across steps? What are the trade-offs?"**
   - Strong answer: lift to parent state or use URL params. Parent state: simple but lost on refresh. URL params: shareable, bookmarkable, survives refresh. Form library (React Hook Form): more power.

4. **"What makes an input 'controlled'? Show me the contract."**
   - Strong answer: value prop + onChange handler. React owns the value. Every keystroke fires onChange, which updates state, which re-renders with new value. Without onChange, input is read-only.

---

## After Phase 2 (Async Email Check)

1. **"How do you prevent the async email check from running on every keystroke?"**
   - Strong answer: debounce the check (e.g., 500ms after typing stops). Only check on blur. Cancel in-flight requests with AbortController if input changes before response.

2. **"What if the email check API is slow? How does the UX degrade?"**
   - Strong answer: show loading indicator, disable Next button while pending. If it fails: fail open (allow) or fail closed (block)? Depends on product decision.

3. **"How do you handle a race condition where two email check requests are in flight?"**
   - Strong answer: abort previous request with AbortController before sending new one. Or track a request ID and ignore stale responses.

4. **"What's the accessibility concern with inline error messages?"**
   - Strong answer: error text should be associated with input via `aria-describedby`. Use `role="alert"` for dynamic errors. Focus management on step change.

---

## After Phase 3 (Dynamic Steps + Review)

1. **"How do you make the step count dynamic based on previous answers?"**
   - Strong answer: derive steps array from form state. Filter/map steps based on conditions. Step component reads from shared form state.

2. **"On the review step, if the user goes back and changes an answer, what happens to later steps?"**
   - Strong answer: need to re-validate or reset dependent fields. E.g., if role changes and it affects visible steps, reset those step's data.

3. **"Would you use React Hook Form for this? What would it give you?"**
   - Strong answer: uncontrolled inputs = better perf (no re-render on each keystroke), built-in validation, watch/trigger APIs, easy integration with zod. Trade-off: another dependency, learning curve.

4. **"How would you test a multi-step form?"**
   - Strong answer: RTL + userEvent. Render form, fill step 1, click Next, assert step 2 appears, fill step 2, submit, assert success state. Test error states separately.
