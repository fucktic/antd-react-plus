#!/bin/bash

# 确保脚本在遇到错误时退出
set -e

# 构建项目
pnpm build

# 创建临时目录用于部署
DEPLOY_DIR="$(mktemp -d)"
SRC_DIR="packages/example/dist"

# 复制构建文件到临时目录
cp -r "$SRC_DIR"/* "$DEPLOY_DIR"

# 进入临时目录并设置Git
cd "$DEPLOY_DIR"
git init
git config user.name "GitHub Actions"
git config user.email "actions@github.com"
git add .
git commit -m "Deploy to GitHub Pages"

# 添加远程仓库
git remote add origin "https://github.com/fucktic/antd-react-plus.git" || true

# 强制推送到gh-pages分支
git push -f origin main:gh-pages

# 清理临时目录
cd - && rm -rf "$DEPLOY_DIR"

# 显示成功消息
echo "Deployment to GitHub Pages completed successfully!"
echo "Your site will be available at: https://fucktic.github.io/antd-react-plus/"