import React, { useState, useEffect } from 'react'
import { Menu } from 'antd'
import { Link, useLocation } from 'react-router-dom'
import { generateMenuItems } from '../router/routes.tsx'
import { routeConfig, type RouteConfig } from '../router/routes.tsx'
import type { MenuProps } from 'antd'

type MenuItem = Required<MenuProps>['items'][number];

// 左侧菜单组件
export const SideMenu = () => {
  const location = useLocation();
  const [openKeys, setOpenKeys] = useState<string[]>(['components']);
  const [selectedKeys, setSelectedKeys] = useState<string[]>(['home']);
  const menuItems = generateMenuItems(routeConfig);
  console.log('生成的菜单:', menuItems);

  // 监听路由变化，更新选中状态
  useEffect(() => {
    const matchingRoute = routeConfig.find(route => {
      if (route.path === location.pathname) return true;
      if (route.children) {
        return route.children.some(child => {
          // 处理相对路径和绝对路径的匹配
          const fullChildPath = child.path.startsWith('/') ? child.path : `${route.path}/${child.path}`;
          return fullChildPath === location.pathname;
        });
      }
      return false;
    });

    if (matchingRoute) {
      setSelectedKeys([matchingRoute.key as string]);
    }
  }, [location.pathname]);

  // 转换路由配置为 antd Menu 组件所需的 items 格式
  const convertToMenuItems = (routes: RouteConfig[]): MenuItem[] => {
    return routes.map(route => {
      const item: MenuItem = {
        key: route.key as string,
        type: route.type as 'group',
        label: route.type ? route.name :
          <Link to={route.path} className='!font-normal'>
            {route.name}
          </Link>
      };

      if (route.children && route.children.length > 0) {
        // 递归处理子菜单，不需要先设置为空数组
        item.children = convertToMenuItems(route.children as RouteConfig[]);
      }

      return item;
    });
  };

  // 处理展开/折叠菜单
  const handleOpenChange = (keys: React.Key[]) => {
    setOpenKeys(keys as string[]);
  };

  // 处理选择菜单项
  const handleSelect = ({ key }: { key: string }) => {
    setSelectedKeys([key]);
  };

  return (
    <aside className="w-72 bg-white border-r border-gray-100 overflow-y-auto py-4">
      <Menu
        mode="inline"
        openKeys={openKeys}
        selectedKeys={selectedKeys}
        onOpenChange={handleOpenChange}
        onSelect={handleSelect}
        items={convertToMenuItems(menuItems)}
        className="border-none sidebar-menu"
        style={{
          height: '100%',
          borderRight: 0,
        }}
      />
    </aside>
  )
}

export default SideMenu