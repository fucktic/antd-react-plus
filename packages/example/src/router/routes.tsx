import { ReactNode } from 'react'
import Home from '../pages/Home'
import Changelog from '../pages/Changelog';
import CascaderSecondaryPage from '../pages/CascaderSecondaryPage';

// 路由配置项类型定义
export interface RouteConfig {
  path: string;
  element?: ReactNode;
  component?: React.LazyExoticComponent<any>;
  name?: string;
  key?: string;
  icon?: string;
  children?: RouteConfig[];
  hidden?: boolean;
  type?: string
}

// 路由配置数组
export const routeConfig: RouteConfig[] = [
  {
    path: '/',
    element: <Home />,
    name: '概览',
    key: 'home'
  },
  {
    path: '/changelog',
    name: '更新日志',
    key: 'changelog',
    element: <Changelog />
  },
  {
    path: '/components',
    key: 'components',
    type: 'group',
    name: '组件',
    children: [
      {
        path: 'cascader-secondary',
        element: <CascaderSecondaryPage />,
        name: '二级级联选择器 CascaderSecondary',
        key: 'cascader-secondary'
      }
    ]
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

// 生成菜单配置 - 添加父路径参数以支持路径拼接
export const generateMenuItems = (routes: RouteConfig[], parentPath = ''): RouteConfig[] => {
  return routes
    .filter(route => !route.hidden)
    .map(route => {
      // 处理路径拼接，避免重复斜杠
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

      return {
        ...route,
        path: fullPath, // 替换为完整路径
        children: route.children ? generateMenuItems(route.children, fullPath) : undefined
      };
    });
}