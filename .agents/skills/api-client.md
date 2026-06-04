# api-client

Use for interacting with backend APIs.

## Requirements
- Must use `@shared/main/api` for route definitions
- Must use `@shared/main` shared types for request/response
- Wrap all calls with @tanstack/react-query hooks

## Pattern
```typescript
import { ROUTES } from '@shared/main/api';
import { CreateTaskDto } from '@shared/main/schema';

// Use react-query for data fetching
export function useTasks() {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: () => fetch(ROUTES.TASKS.LIST).then(r => r.json()),
  });
}
```