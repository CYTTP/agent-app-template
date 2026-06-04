# Project Context

agent-app-template is a full-stack AI Agent monorepo.

## Architecture
- Frontend: React 19 + Vite 8 + Ant Design + TailwindCSS
- Backend: NestJS + Drizzle ORM + better-sqlite3
- Monorepo: pnpm workspace + TurboRepo
- Shared: @shared/main (types, API routes, Zod schemas)

## Key Decisions
- SQLite via better-sqlite3 for simplicity (no external DB)
- Drizzle ORM for type-safe database access
- Zustand for global UI state
- @tanstack/react-query for server state
- Ant Design v6 for UI components
- Zod for shared validation (both frontend and backend)