# Frontend Rules

## Components
- Prefer Ant Design components over raw HTML tags
- Use TailwindCSS for custom styling (utilities only)
- Keep components small and focused

## State Management
- Use Zustand for global state
- Use @tanstack/react-query for server state
- Use React context for shared UI state

## Routing
- Use React Router 7 for routing
- Keep routes flat; avoid deeply nested layouts

## API Calls
- Always use `@shared/main/api` for route definitions
- Always use `@shared/main/schema` for validation
- Always use `@shared/main` types for request/response types