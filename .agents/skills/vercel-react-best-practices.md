# vercel-react-best-practices

React performance optimization and engineering best practices from Vercel.

## Principles
- Server components where possible (Next.js) or lazy loading (Vite)
- Minimize re-renders (memo, useMemo, useCallback)
- Optimize data fetching (deduplication, caching)
- Use proper key props and avoid index keys