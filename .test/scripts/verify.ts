/**
 * 启动验证脚本
 * 验证项目是否能正常构建和启动
 */

const { execSync } = require('child_process');
const path = require('path');

const ROOT = path.resolve(__dirname, '../..');

function run(cmd, opts = {}) {
  console.log(\n> );
  execSync(cmd, { cwd: ROOT, stdio: 'inherit', ...opts });
}

async function verify() {
  console.log('=== 验证项目启动 ===\n');

  // 1. 执行类型检查
  console.log('--- 类型检查 ---');
  run('pnpm typecheck:shared');

  // 2. 构建共享包
  console.log('\n--- 构建共享包 ---');
  run('pnpm --filter @shared/main build');

  console.log('\n=== 验证完成 ===');
}

verify().catch((err) => {
  console.error('验证失败:', err);
  process.exit(1);
});
