#!/bin/bash

# 确保脚本在遇到错误时退出
set -e

# 检查GitHub仓库配置
echo "=== 检查GitHub远程仓库配置 ==="
git remote -v

echo -e "\n=== 检查分支信息 ==="
git branch -a

echo -e "\n=== 检查远程gh-pages分支内容 ==="
# 创建临时目录用于查看gh-pages分支内容
GH_PAGES_DIR="$(mktemp -d)"
git clone -b gh-pages --single-branch "https://github.com/fucktic/antd-react-plus.git" "$GH_PAGES_DIR"

echo -e "\n=== gh-pages分支文件列表 ==="
ls -la "$GH_PAGES_DIR"

echo -e "\n=== gh-pages分支index.html内容 ==="
cat "$GH_PAGES_DIR/index.html"

echo -e "\n=== 检查构建文件是否存在 ==="
if [ -f "$GH_PAGES_DIR/assets/index-C5GrVLKM.js" ]; then
echo "构建文件存在"
else
echo "构建文件不存在，请重新构建项目"
fi

# 清理临时目录
rm -rf "$GH_PAGES_DIR"

# 显示访问链接
echo -e "\n=== 访问链接 ==="
echo "GitHub Pages: https://fucktic.github.io/antd-react-plus/"
echo "请确保仓库的GitHub Pages设置已正确配置，来源应为gh-pages分支"