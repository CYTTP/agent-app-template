# Server

基于 NestJS 的后端服务。

## 技术栈

- **框架**：NestJS 11
- **运行时**：Node.js 24 + TypeScript
- **校验**：Zod
- **开发**：tsx watch（热重载）

## 目录结构

```
src/
├── main.ts                      # 入口：全局拦截器、过滤器、CORS
├── app.module.ts                # 根模块
├── config/                      # 配置层
│   ├── app.config.ts            # 应用配置（env 解析）
│   ├── config.module.ts         # 全局配置模块
│   └── env.schema.ts            # 环境变量 Zod schema
├── common/                      # 通用层
│   ├── constants/               # 常量
│   ├── dto/                     # 数据传输对象（类型 + schema）
│   ├── filters/                 # 异常过滤器
│   ├── interceptors/            # 响应拦截器
│   ├── pipes/                   # 校验管道
│   └── utils/                   # 工具函数
└── modules/                     # 业务模块
    └── health/                  # 健康检查模块
        ├── health.module.ts
        ├── health.controller.ts
        └── health.service.ts
```

## 快速开始

```bash
# 在项目根目录启动（前后端同时）
pnpm dev

# 仅启动后端
pnpm --filter server dev
```

后端默认监听 `http://localhost:8787`。

## 环境变量

| 变量 | 默认值 | 说明 |
|---|---|---|
| `NODE_ENV` | `development` | 运行环境 |
| `SERVER_PORT` | `8787` | 监听端口 |
| `CORS_ORIGINS` | `http://localhost:5173,http://localhost:8080` | CORS 允许源（逗号分隔） |

## API

### `GET /api/health`

健康检查。

**响应**：

```json
{
  "code": 200,
  "message": "OK",
  "data": {
    "status": "ok",
    "service": "agent-app-template-server",
    "timestamp": "2026-07-10T00:00:00.000Z"
  }
}
```

## 统一返回格式

所有接口返回统一结构 `{ code, message, data }`：

- **成功**：controller 直接返回业务数据，由全局拦截器自动包装为 `{ code: <http状态码>, message: "<描述>", data: ... }`
- **异常**：由全局异常过滤器统一捕获（`HttpException` / `ZodError` / 未知异常），返回 `{ code: <状态码>, message: "<错误信息>", data: { path, timestamp, details? } }`

## 开发规范

### 新增业务模块

1. 在 `modules/<domain>/` 创建 `*.module.ts`、`*.controller.ts`、`*.service.ts`
2. controller 返回业务 data 即可，**不要手动包装** `code` / `message`
3. 在 `app.module.ts` 中 `imports` 注册新模块

### 参数校验

使用 `ZodValidationPipe` 配合 Zod schema：

```ts
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { SomeSchema } from '@shared/main/schemas';

@Post()
create(@Body(new ZodValidationPipe(SomeSchema)) dto: SomeType) {
  return this.someService.create(dto);
}
```

### 类型定义

共享类型和 schema 定义在 `packages/shared/src/`，通过 `@shared/main` 导入。

## 脚本

| 命令 | 说明 |
|---|---|
| `pnpm --filter server dev` | 启动开发服务（热重载） |
| `pnpm --filter server typecheck` | 类型检查 |
| `pnpm --filter server start` | 生产启动 |
