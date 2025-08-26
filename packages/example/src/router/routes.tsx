import { ReactNode } from 'react'
import Home from '../pages/Home'
import ButtonPage from '../pages/ButtonPage'
import CardPage from '../pages/CardPage'
import InputPage from '../pages/InputPage'

// 路由配置项类型定义
export interface RouteConfig {
  path: string;
  element: ReactNode;
  name?: string;
  key?: string;
  icon?: string;
  children?: RouteConfig[];
  hidden?: boolean;
}

// 路由配置数组
export const routeConfig: RouteConfig[] = [
  {
    path: '/',
    element: <Home />,
    name: '首页',
    key: 'home'
  },
  {
    path: '/components',
    name: '组件',
    key: 'components',
    children: [
      {
        path: 'button',
        element: <ButtonPage />,
        name: '按钮 Button',
        key: 'button'
      },
      {
        path: 'card',
        element: <CardPage />,
        name: '卡片 Card',
        key: 'card'
      },
      {
        path: 'input',
        element: <InputPage />,
        name: '输入框 Input',
        key: 'input'
      }
    ]
  },
  {
    path: '/guide',
    name: '使用指南',
    key: 'guide',
    element: <div className="p-8 text-center text-xl"> 使用指南页面正在建设中...</div>
  }
]

// 根据路由配置生成React Router的Routes组件所需的路由对象
export const generateRoutes = (routes: RouteConfig[], parentPath = ''): RouteConfig[] => {
  const result: RouteConfig[] = [];

  routes.forEach(route => {
    // 确保path存在
    if (!route.path) return;

    // 处理路径合并，避免重复斜杠
    let fullPath = '';
    if (parentPath && parentPath !== '/') {
      // 如果父路径不是根路径，且子路径不以/开头，则添加斜杠连接
      if (route.path.startsWith('/')) {
        fullPath = route.path;
      } else {
        fullPath = `${parentPath}/${route.path}`;
      }
    } else {
      // 根路径情况
      fullPath = route.path;
    }

    // 确保路径格式正确（移除多余的斜杠）
    fullPath = fullPath.replace(/\/+/g, '/');

    if (!route.hidden && route.element) {
      result.push({
        ...route,
        path: fullPath
      });
    }

    if (route.children && route.children.length > 0) {
      // 对子路由传递当前完整路径作为父路径
      result.push(...generateRoutes(route.children, fullPath));
    }
  });

  return result;
}

// 生成菜单配置
export const generateMenuItems = (routes: RouteConfig[]): RouteConfig[] => {
  return routes
    .filter(route => !route.hidden)
    .map(route => ({
      ...route,
      children: route.children ? generateMenuItems(route.children) : undefined
    }));
}