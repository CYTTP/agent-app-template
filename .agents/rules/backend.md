# Backend Rules

## Controller
- Always use validation pipes (Zod or class-validator)
- Always return ApiResponse format
- Use RESTful URL patterns: GET/POST/PUT/DELETE

## Service
- Business logic only in services, never in controllers
- Use dependency injection for all dependencies
- Throw NestJS HttpException for error handling

## Module
- One module per domain (auth, tasks, users, etc.)
- Import only what is needed
- Use Drizzle ORM for database access

## Database
- Use Drizzle ORM with better-sqlite3 for SQLite
- Define schema in `@shared/main/schema`
- Use drizzle-kit for migrations