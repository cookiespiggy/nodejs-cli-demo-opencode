#!/usr/bin/env node

// 引入 commander 库，用于构建 CLI 工具
const { Command } = require('commander');

// 创建命令程序实例
const program = new Command();

// 设置程序名称和版本
program
  .name('my-cli')
  .description('一个简单的 Node.js CLI 工具')
  .version('1.0.0');

// 注册 greet 命令
program
  .command('greet')
  .description('向用户打招呼')
  // -n, --name 选项用于指定用户名
  .option('-n, --name <name>', '指定要打招呼的用户名', 'World')
  .action((options) => {
    // 输出问候语
    console.log(`你好, ${options.name}!`);
  });

// 解析命令行参数
program.parse();
