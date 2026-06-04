---
name: components-used
description: 检查生成的组件是否为最佳实践
---

- 使用 <Flex/> 而不是 <div>

```tsx
import { Flex } from 'antd';

<!-- ✅ 推荐使用 Flex -->
<Flex>
  <div>1</div>
  <div>2</div>
</Flex>

<!-- ❌ 不推荐使用 div+className -->
<div className="flex items-center">
  <div>1</div>
  <div>2</div>
</div>
```

- 使用<Button>而不是<button>

```tsx
import { Button } from 'antd';

<!-- ✅ 推荐使用 Button -->
<Button>按钮</Button>

<!-- ❌ 不推荐使用 button+className -->
<button className="bg-blue-500 text-white px-4 py-2 rounded-md">
  按钮
</button>
```
