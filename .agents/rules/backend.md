# Backend Rules

## 项目结构

```
src/
├── main.ts                       # 入口：全局拦截器、过滤器、CORS
├── app.module.ts                 # 根模块（组装 config + 各业务模块）
├── config/                       # 配置层
│   ├── env.schema.ts             # 环境变量 Zod schema
│   ├── app.config.ts             # loadAppConfig() 解析并校验 env
│   └── config.module.ts          # @Global() 配置模块
├── common/                       # 通用层
│   ├── constants/                # 常量（如 HttpStatus）
│   ├── dto/                      # DTO 定义（类型 + Zod schema 重导出）
│   ├── filters/                  # 全局异常过滤器
│   ├── interceptors/             # 全局响应拦截器
│   ├── pipes/                    # 校验管道（ZodValidationPipe）
│   └── utils/                    # 工具函数（如 createApiResponse）
└── modules/                      # 业务模块（按领域拆分）
    └── <domain>/
        ├── <domain>.module.ts
        ├── <domain>.controller.ts
        └── <domain>.service.ts
```

## Controller

- 只负责路由和请求入口，**不写业务逻辑**
- 返回业务 data 即可，统一包装由全局 `ResponseInterceptor` 自动完成
- 使用 `ZodValidationPipe` 做请求参数校验
- 使用 RESTful 风格：`@Get()` / `@Post()` / `@Put()` / `@Delete()`
- 路由前缀按模块定义：`@Controller('/api/<resource>')`

```ts
@Controller('/api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Post()
  create(@Body(new ZodValidationPipe(CreateUserSchema)) dto: CreateUserDto) {
    return this.usersService.create(dto);
  }
}
```

## Service

- **所有业务逻辑**必须在 Service 中实现
- 通过依赖注入（DI）使用，构造函数注入
- 错误处理使用 NestJS `HttpException` 子类（`BadRequestException`、`NotFoundException` 等）
- 不手动构造 `{ code, message, data }` 响应结构，只返回业务数据

```ts
@Injectable()
export class UsersService {
  findAll(): User[] {
    // 业务逻辑
  }

  create(dto: CreateUserDto): User {
    if (/* 校验失败 */) {
      throw new BadRequestException('...');
    }
    // 业务逻辑
  }
}
```

## Module

- 一个领域一个模块：`modules/<domain>/`
- 每个模块包含 `*.module.ts`、`*.controller.ts`、`*.service.ts`
- 只导入当前模块需要的依赖
- 新模块必须在 `app.module.ts` 的 `imports` 中注册

```ts
@Module({
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
```

## 统一响应格式

- 所有接口返回 `{ code: number, message: string, data: T }`
- **成功**：`ResponseInterceptor` 自动包装 controller 返回值
- **异常**：`AllExceptionsFilter` 统一捕获以下类型：
  - `HttpException` → 取其 status 和 message
  - `ZodError` → 400 + 校验详情
  - `Error` / 未知异常 → 500 + 错误信息
- **不要在 controller/service 中手动包装响应**

成功响应示例：
```json
{ "code": 200, "message": "OK", "data": { ... } }
```

异常响应示例：
```json
{ "code": 400, "message": "Validation failed", "data": { "path": "/api/...", "timestamp": "...", "details": { ... } } }
```

## 配置管理

- 环境变量由 `config/env.schema.ts` 中的 Zod schema 定义
- `config/app.config.ts` 的 `loadAppConfig()` 负责解析和校验
- CORS 源、端口等均从 `AppConfig` 读取，**不硬编码**

## 参数校验

- 使用 `ZodValidationPipe` + Zod schema 校验请求参数
- Schema 定义在 `@shared/main/schemas` 中
- 校验失败自动返回 400 + 扁平化错误信息

```ts
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { CreateUserSchema } from '@shared/main/schemas';

@Post()
create(@Body(new ZodValidationPipe(CreateUserSchema)) dto: CreateUserType) {
  return this.service.create(dto);
}
```

## Database

- 使用 Drizzle ORM + better-sqlite3（SQLite）
- Schema 定义在 `@shared/main/schema`
- 使用 drizzle-kit 管理迁移
- 数据库操作在 Service 层，**不在 Controller 层**

## 类型与 Schema 共享

- 共享类型 → `packages/shared/src/types.ts`
- 共享 Zod schema → `packages/shared/src/schemas.ts`
- 共享 API 路由常量 → `packages/shared/src/api.ts`
- 通过 `import { ... } from '@shared/main'` 导入
