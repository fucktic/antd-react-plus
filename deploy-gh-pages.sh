#!/bin/bash

# 确保脚本在遇到错误时退出
set -e

# 构建项目
pnpm build

# 验证构建文件是否存在
build_dir="packages/example/dist"
if [ ! -d "$build_dir" ]; then
  echo "错误: 构建目录 $build_dir 不存在，请先运行构建命令。"
  exit 1
fi

if [ ! -f "$build_dir/index.html" ]; then
  echo "错误: 构建后的index.html文件不存在，请检查构建过程。"
  exit 1
fi

# 显示构建后的index.html内容（用于调试）
echo "=== 构建后的index.html文件内容预览 ==="
head -15 "$build_dir/index.html"
echo "=================================="

# 创建临时目录用于部署
DEPLOY_DIR="$(mktemp -d)"
echo "创建临时部署目录: $DEPLOY_DIR"

# 复制构建文件到临时目录
cp -r "$build_dir"/* "$DEPLOY_DIR"

# 进入临时目录并设置Git
cd "$DEPLOY_DIR"
git init
git config user.name "GitHub Actions"
git config user.email "actions@github.com"
git add .
git commit -m "Deploy to GitHub Pages"

# 添加远程仓库（使用SSH URL）
echo "添加GitHub远程仓库（使用SSH URL）..."
git remote add origin "git@github.com:fucktic/antd-react-plus.git" || true

# 强制推送到gh-pages分支
echo "推送到GitHub gh-pages分支..."
git push -f origin HEAD:gh-pages

# 清理临时目录
cd - && rm -rf "$DEPLOY_DIR"

# 显示成功消息
echo "\n=== 部署成功 ==="
echo "项目已成功部署到GitHub Pages！"
echo "您的网站将在以下地址可用: https://fucktic.github.io/antd-react-plus/"
echo "注意：GitHub Pages可能需要几分钟时间来更新和缓存您的网站。"

echo "\n=== 部署验证 ==="
echo "1. 请确认GitHub仓库设置中GitHub Pages的来源已设置为gh-pages分支"
echo "2. 检查访问权限是否正确配置"
echo "3. 如果仍然遇到404错误，请等待几分钟后再试"