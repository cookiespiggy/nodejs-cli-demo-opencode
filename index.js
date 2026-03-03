#!/usr/bin/env node

const { Command } = require('commander');
const fs = require('fs');
const path = require('path');

const HISTORY_FILE = path.join(process.env.HOME || process.env.USERPROFILE, '.cli-history.json');

function loadHistory() {
  try {
    if (fs.existsSync(HISTORY_FILE)) {
      return JSON.parse(fs.readFileSync(HISTORY_FILE, 'utf-8'));
    }
  } catch (e) {
    return [];
  }
  return [];
}

function saveHistory(history) {
  fs.writeFileSync(HISTORY_FILE, JSON.stringify(history, null, 2));
}

function addToHistory(entry) {
  const history = loadHistory();
  history.unshift(entry);
  if (history.length > 100) history.pop();
  saveHistory(history);
}

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

// 注册 calc 命令
program
  .command('calc')
  .description('进行四则运算')
  .argument('<num1>', '第一个数字')
  .argument('<num2>', '第二个数字')
  .option('-o, --operator <operator>', '运算符 (add/subtract/multiply/divide)', 'add')
  .action((num1, num2, options) => {
    const a = parseFloat(num1);
    const b = parseFloat(num2);

    if (isNaN(a) || isNaN(b)) {
      console.error('错误: 请输入有效的数字');
      process.exit(1);
    }

    let result;
    switch (options.operator) {
      case 'add':
        result = a + b;
        break;
      case 'subtract':
        result = a - b;
        break;
      case 'multiply':
        result = a * b;
        break;
      case 'divide':
        if (b === 0) {
          console.error('错误: 除数不能为零');
          process.exit(1);
        }
        result = a / b;
        break;
      default:
        console.error(`错误: 未知的运算符 "${options.operator}"，请使用 add/subtract/multiply/divide`);
        process.exit(1);
    }

    console.log(`结果: ${result}`);

    addToHistory({
      timestamp: new Date().toISOString(),
      num1: a,
      num2: b,
      operator: options.operator,
      result: result
    });
  });

// 注册 history 命令
program
  .command('history')
  .description('显示计算历史记录')
  .option('-c, --clear', '清空所有历史记录')
  .action((options) => {
    if (options.clear) {
      saveHistory([]);
      console.log('历史记录已清空');
      return;
    }

    const history = loadHistory();
    if (history.length === 0) {
      console.log('暂无历史记录');
      return;
    }

    console.log('=== 计算历史 ===');
    history.forEach((entry, index) => {
      const time = new Date(entry.timestamp).toLocaleString();
      console.log(`${index + 1}. ${entry.num1} ${entry.operator} ${entry.num2} = ${entry.result} (${time})`);
    });
  });

// 解析命令行参数
program.parse();
