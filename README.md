# antd-react-plus

基于 React 和 Ant Design 的组件库及示例项目

## 项目简介

antd-react-plus 是一个基于 React 和 Ant Design 开发的组件库，旨在提供丰富、易用、高质量的 UI 组件，帮助开发者快速构建现代化的 Web 应用。

该项目采用 monorepo 结构，包含以下两个主要包：
- **antd-react-plus-ui**：核心组件库
- **antd-react-plus-example**：组件库的示例文档和演示应用

## 技术栈

- React 19+
- Ant Design 5+
- TypeScript
- Vite
- Tailwind CSS
- pnpm

## 目录结构

```
antd-react-plus/
├── .gitignore          # Git忽略规则
├── package.json        # 根项目配置
├── pnpm-lock.yaml      # pnpm依赖锁文件
├── pnpm-workspace.yaml # pnpm工作区配置
└── packages/
    ├── example/        # 示例文档和演示应用
    │   ├── src/        # 示例应用源代码
    │   ├── package.json # 示例应用配置
    │   └── vite.config.ts # 示例应用Vite配置
    └── ui/             # 组件库源码
        ├── src/        # 组件库源代码
        ├── package.json # 组件库配置
        └── vite.config.ts # 组件库Vite配置
```

## 快速开始

### 环境要求

- Node.js >= 16
- pnpm >= 8

### 安装依赖

```bash
# 在项目根目录执行
pnpm install
```

### 开发模式

启动开发服务器，查看示例应用：

```bash
pnpm dev
```

开发服务器将在 http://localhost:5173/ 启动。

## 开发指南

### 组件开发

1. 在 `packages/ui/src/` 目录下创建新组件
2. 在 `packages/example/src/` 目录下创建对应的演示页面
3. 运行 `pnpm dev` 实时查看组件效果

### 代码规范

项目使用 ESLint 和 Prettier 进行代码规范检查：

```bash
# 运行 ESLint 检查
pnpm lint

# 格式化代码
pnpm format
```

## 构建和部署

### 构建组件库

```bash
pnpm -F ui build
```

构建后的文件将输出到 `packages/ui/dist/` 目录。

### 构建示例文档

```bash
pnpm -F example build
```

构建后的文件将输出到 `packages/example/dist/` 目录。

### 完整构建

构建组件库和示例文档：

```bash
pnpm build
```

## 在项目中使用

### 安装组件库

```bash
pnpm add antd-react-plus-ui antd react react-dom
```

### 引入组件

```tsx
import { Button } from 'antd-react-plus-ui';

function App() {
  return <Button type="primary">点击我</Button>;
}
```

## 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 联系方式

如有问题或建议，欢迎提出 Issue 或 Pull Request。