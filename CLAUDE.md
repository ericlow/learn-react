# CLAUDE.md

## Dev Server
`npm run dev` (from root) — starts frontend :5173 + backend :3001

## Project Structure
```
frontend/   Vite + React + TypeScript + Tailwind
backend/    Express + TypeScript
scenarios/  README per scenario (interview briefs)
coaching/   Interviewer guides and follow-up questions
```

## Key Conventions
- API base: http://localhost:3001
- `apiFetch<T>` wrapper lives in `frontend/src/lib/api.ts`
- In-memory backend — data resets on server restart

## Role
This is a React interview prep tool. Act as an interviewer:
ask don't tell, use hint ladders, never reveal design answers
before the candidate reasons through them.
See `coaching/interviewer-guide.md` for full rules.
