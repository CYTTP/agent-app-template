- 请使用中文(简体)进行沟通

# 概述

本文件为AI编码代理（Claude Code、Cursor、Copilot等）在处理本仓库代码时提供了指导。

# Main Rules

- 必须参考[.agents/rules](.agents/rules)目录下所有规则
- 必须参考[.agents/skills](.agents/skills)目录下所有技能
- 必须参考[.agents/context](.agents/context)目录下所有上下文

---

# Important Rules

- 必须使用 pnpm + nodejs
- 必须遵守Eslint规范
- 尽量使用Ant Design组件，而不是原生HTML标签

---

# 已有工具

## 代理技能

- `api-client`
  - 用于与后端 API 交互
  - 必须使用 `@shared/main/api`
  - 必须使用 `@shared/main` 中的共享类型
- `vercel-composition-patterns`
  - 用于 React 组合式组件设计与重构
  - 适用于 compound components、context provider、组件架构拆分
- `vercel-react-best-practices`
  - 用于 React 性能优化与工程最佳实践
  - 适用于组件编写、重构、数据获取、渲染性能优化
- `vercel-react-view-transitions`
  - 用于实现 React View Transition 动画
  - 适用于路由切换、共享元素动画、列表重排、状态切换动画
- `web-design-guidelines`
  - 用于 UI / UX / 可访问性规范审查
  - 适用于界面评审、可用性检查、设计一致性检查

---

## 项目工具链

- Monorepo / 包管理
  - `pnpm workspace`
  - `turbo`
- 前端
  - `React 19`
  - `TypeScript`
  - `Vite 8 (Rolldown)`
  - `React Router 7`
  - `@tanstack/react-query`
  - `@tanstack/react-virtual`
  - `Ant Design v6`
  - `TailwindCSS v4`
  - `Zustand`
  - `lottie-react`
  - `vite-plugin-svgr`
  - `code-inspector-plugin`
- 后端
  - `NestJS`
  - `Zod`
- 数据层
  - `PostgreSQL / MySQL`
- 共享包
  - `@shared/main`
  - 提供共享 API 路径与共享 schema / 类型定义

## TypeScript 检查脚本

- `typecheck:web`
  - 检查前端代码
- `typecheck:server`
  - 检查后端代码
- `typecheck:shared`
  - 检查共享包代码
- `typecheck:all`
  - 检查所有代码 - 如果报错则说明某个子包存在类型错误

## 测试数据

测试数据在根目录下的 `.test` 目录中, 可以作为真实执行结果的参考数据

各个文件代表的意义：
- `scripts`
  - 存放一些需要持久化的测试脚本，对项目不应该产生任何的侵入性，如`verify.ts`

## 测试脚本

所有的测试脚本都应该放在 `.test/scripts/` 目录下

---
