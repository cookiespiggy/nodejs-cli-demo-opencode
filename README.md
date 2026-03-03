# my-cli

一个简单的 Node.js CLI 工具，使用 commander 库构建。

## 安装

```bash
npm install
```

## 使用方法

### 本地测试

```bash
node index.js --help
```

### 全局安装

```bash
npm link
```

然后可以使用：

```bash
my-cli --help
my-cli --version
my-cli greet
my-cli greet -n 张三
```

## 命令

### version

显示版本号。

```bash
my-cli --version
# 输出: 1.0.0
```

### greet

向用户打招呼。

```bash
# 使用默认名称 World
my-cli greet
# 输出: 你好, World!

# 指定用户名
my-cli greet -n 张三
# 输出: 你好, 张三!
```

## 选项

- `-n, --name <name>` - 指定要打招呼的用户名（默认: World）
