# antd-react-plus-ui

基于 React 和 Ant Design 的组件库，提供丰富的 UI 组件和工具函数，帮助开发者快速构建现代化的 Web 应用。

## 特性

- 基于 Ant Design 扩展，提供更多实用组件
- 完全兼容 React 18 和 React 19
- TypeScript 类型支持
- 支持 Tree Shaking
- 响应式设计

## 安装

使用 npm 安装：

```bash
npm install antd-react-plus-ui antd react react-dom
```

使用 yarn 安装：

```bash
yarn add antd-react-plus-ui antd react react-dom
```

使用 pnpm 安装：

```bash
pnpm add antd-react-plus-ui antd react react-dom
```

## 快速开始

```tsx
import React from 'react';
import { Button } from 'antd';
// 导入组件库中的组件
import { CustomTable, SearchInput } from 'antd-react-plus-ui';

const App = () => {
  return (
    <div>
      <h1>Hello, antd-react-plus-ui!</h1>
      <SearchInput placeholder="搜索" />
      <Button type="primary">点击按钮</Button>
      <CustomTable 
        columns={[]}
        dataSource={[]}
      />
    </div>
  );
};

export default App;
```

## 组件列表

| 组件名称 | 描述 | 文档 |
|---------|------|------|
| CustomTable | 增强的表格组件 | 即将上线 |
| SearchInput | 带搜索功能的输入框 | 即将上线 |
| FormGenerator | 表单生成器 | 即将上线 |
| ModalWrapper | 模态框包装器 | 即将上线 |
| CardGroup | 卡片组 | 即将上线 |

## 开发指南

### 安装依赖

```bash
# 根目录安装所有依赖
pnpm install

# 进入 ui 目录
cd packages/ui

# 启动开发服务器
pnpm dev
```

### 构建

```bash
# 在 ui 目录下
pnpm build
```

## 贡献

欢迎贡献代码、提出问题或建议！请先查看[贡献指南](https://github.com/xuwei1996/antd-react-plus/blob/main/CONTRIBUTING.md)。

## 许可证

本项目采用 [MIT](https://github.com/xuwei1996/antd-react-plus/blob/main/LICENSE) 许可证。

## 链接

- [GitHub 仓库](https://github.com/xuwei1996/antd-react-plus.git)
- [NPM 包](https://www.npmjs.com/package/antd-react-plus-ui)