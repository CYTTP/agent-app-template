# Agent App Template

一个可直接 `git clone` 使用的最小全栈 Agent 模板。

前端只有一个页面，启动后会调用后端 `/api/health` 接口并展示服务状态。后端基于 NestJS，仅保留健康检查能力，适合作为后续扩展 agent、工具调用、工作流编排的起点。

## 项目结构

```text
apps/
  server/      # NestJS 后端
  web/         # React + Vite 前端

packages/
  shared/      # 前后端共享 API 路径与类型

docker/
  server.Dockerfile
  web.Dockerfile
  nginx.conf
```

## 本地开发

### 环境要求

- Node.js 24
- pnpm 11

### 安装依赖

```bash
pnpm install
```

### 启动项目

```bash
pnpm dev
```

启动后可访问：

- 前端: [http://localhost:5173](http://localhost:5173)
- 后端: [http://localhost:8787/api/health](http://localhost:8787/api/health)

## Docker 启动

### 1. 准备环境变量

```bash
cp .env.example .env
```

### 2. 构建并启动

```bash
docker compose up --build
```

启动后可访问：

- 页面: [http://localhost:8080](http://localhost:8080)
- 健康接口: [http://localhost:8787/api/health](http://localhost:8787/api/health)

## 常用命令

```bash
pnpm dev
pnpm build
pnpm typecheck:all
pnpm --filter web build
pnpm --filter server start
```

## 模板说明

- 前端通过 `@shared/main/api` 读取接口路径
- 前后端通过 `packages/shared` 共享响应类型
- Docker 默认使用 `web -> nginx -> server` 的方式部署，前端无需手动配置跨域

## 后续扩展建议

- 在 `packages/shared` 中增加 agent 任务类型、请求 schema、工具返回结构
- 在 `apps/server` 中增加 agent 模块、工具调用封装、持久化层
- 在 `apps/web` 中增加会话页、任务页、日志页
