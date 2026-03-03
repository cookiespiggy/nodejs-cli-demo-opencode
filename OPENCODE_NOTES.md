# 📚 OpenCode 学习笔记

**学习时间：** 2026 年 3 月 4 日  
**学习模型：** big-pickle (Free)  
**学习目标：** 掌握使用 OpenCode 进行高效开发

---

## 🎯 核心概念

### 1. OpenCode 是什么

- **开源 AI 编程助手** - 类似 Claude Code，但 100% 开源
- **提供商中立** - 支持 75+ LLM 提供商
- **TUI 优先** - 专注于终端用户体验
- **客户端/服务器架构** - 支持远程驱动

### 2. Agents（智能体）

| Agent | 用途 | 快捷键 |
|-------|------|--------|
| **build** | 默认，完整开发权限 | - |
| **plan** | 只读，分析和规划 | `Tab` 切换 |
| **@general** | 子 agent，复杂任务 | 在消息中调用 |

---

## 🚀 正确使用方式

### ❌ 错误用法（我之前做的）

```bash
# 只是一次性命令，不是真正的驱动开发
opencode run "创建项目..."
```

### ✅ 正确用法

#### 方式一：交互式 TUI（推荐）

```bash
# 1. 进入项目目录
cd /path/to/project

# 2. 启动交互式会话
opencode

# 3. 在 TUI 中持续对话
/init                          # 初始化项目
添加一个 calc 命令              # 自然语言描述
给 greet 命令添加 --time 选项    # 迭代修改
添加单元测试                    # 扩展功能
```

#### 方式二：使用 `opencode run`（适合单次任务）

```bash
opencode run "给 CLI 添加 calc 命令，支持加减乘除"
```

#### 方式三：服务器模式（适合远程/集成）

```bash
# 启动服务器
opencode serve --port 4096

# 从另一个终端连接
opencode attach http://localhost:4096
```

---

## 📋 常用命令

### TUI 内置命令

| 命令 | 说明 | 快捷键 |
|------|------|--------|
| `/init` | 创建/更新 AGENTS.md | `ctrl+x i` |
| `/undo` | 撤销上次修改 | `ctrl+x u` |
| `/redo` | 重做 | `ctrl+x r` |
| `/share` | 分享会话 | `ctrl+x s` |
| `/compact` | 压缩会话 | `ctrl+x c` |
| `/models` | 查看可用模型 | `ctrl+x m` |
| `/connect` | 配置提供商 | - |
| `/themes` | 切换主题 | `ctrl+x t` |
| `/help` | 显示帮助 | `ctrl+x h` |
| `/exit` | 退出 | `ctrl+x q` |

### 文件引用

```
# 使用 @ 引用文件
如何认证在 @src/auth/index.ts 中处理？

# 文件内容会自动添加到对话中
```

### Shell 命令

```bash
# 使用 ! 运行 shell 命令
!ls -la
!git log --oneline -10
```

---

## 🔧 自定义命令

### 方式一：Markdown 文件

创建 `.opencode/commands/test.md`：

```markdown
---
description: 运行测试
agent: build
model: anthropic/claude-3-5-sonnet
---

运行完整测试套件并生成覆盖率报告。
关注失败的测试并建议修复。
```

使用：`/test`

### 方式二：JSON 配置

在 `opencode.json` 中：

```json
{
  "command": {
    "test": {
      "template": "运行测试并生成报告",
      "description": "运行测试",
      "agent": "build"
    }
  }
}
```

---

## 💡 最佳实践

### 1. 项目初始化

```bash
cd /path/to/project
opencode
/init  # 生成 AGENTS.md，帮助 OpenCode 理解项目
```

### 2. 迭代开发

```
1. 描述需求（自然语言）
2. OpenCode 实现
3. 测试验证
4. 不满意用 /undo
5. 调整需求重新来
```

### 3. 使用 Plan 模式

```
# 复杂功能先用 plan 模式规划
Tab 切换到 plan 模式
描述功能需求
审查计划
Tab 切换回 build 模式执行
```

### 4. Git 集成

- `/undo` 和 `/redo` 依赖 Git
- 确保项目是 Git 仓库
- 定期提交保持干净的恢复点

---

## 🆓 免费模型使用

### OpenCode Zen 免费模型

| 模型 | 输入 | 输出 | 说明 |
|------|------|------|------|
| **big-pickle** | Free | Free | 限时免费，数据可能用于改进 |
| **minimax-m2.5-free** | Free | Free | 限时免费，中文友好 |
| **gpt-5-nano** | Free | Free | OpenAI 轻量模型 |

### 配置方式

```bash
# 1. 注册 https://opencode.ai/auth
# 2. 获取 API 密钥
# 3. 在 TUI 中
/connect
选择 OpenCode Zen
粘贴 API 密钥
/models
选择 opencode/big-pickle
```

---

## 📁 项目结构

```
project/
├── .opencode/
│   ├── commands/      # 自定义命令
│   └── rules/         # 项目规则
├── AGENTS.md          # 项目上下文（/init 生成）
├── opencode.json      # 配置
└── opencode.jsonl     # 会话日志
```

---

## 🎓 学习心得

### 我之前的误区

1. **只用 `opencode run`** - 这是一次性命令，不是真正的驱动开发
2. **没有用 TUI** - 交互式对话才是 OpenCode 的精髓
3. **没有用 /init** - 缺少项目上下文理解

### 正确的打开方式

1. **启动 TUI** - `opencode` 进入交互模式
2. **初始化** - `/init` 生成 AGENTS.md
3. **自然语言对话** - 像和同事交流一样描述需求
4. **迭代修改** - 不满意用 `/undo`，调整后重来
5. **利用快捷键** - 提高效率

---

## 🔗 参考资源

- **官网：** https://opencode.ai
- **文档：** https://opencode.ai/docs
- **GitHub：** https://github.com/anomalyco/opencode
- **Discord：** https://discord.gg/opencode
- **模型列表：** https://opencode.ai/zen/v1/models

---

**🌸 学习笔记 by 米宝宝的 AI 助手**
