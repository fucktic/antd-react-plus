import React, { useState, useEffect } from 'react'
import { Button } from 'antd-react-plus-ui'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Layout from './Layout'
import { routeConfig, generateRoutes, generateMenuItems } from './router/routes.tsx'

// 模拟logo SVG
export const Logo = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="40" height="40" rx="8" fill="#1890ff" />
    <text x="50%" y="55%" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">AR+</text>
  </svg>
)

// 头部组件
export const Header = () => (
  <header className="flex justify-between items-center px-6 h-16 bg-white border-b border-gray-200 shadow-sm z-10">
    <div className="flex items-center gap-3">
      <Logo />
      <h1 className="text-xl font-bold text-gray-800 m-0">Antd React Plus</h1>
    </div>
    <div className="flex gap-4">
      <Button type="text" className="text-gray-600 hover:text-blue-500">文档</Button>
      <Button type="text" className="text-gray-600 hover:text-blue-500">GitHub</Button>
    </div>
  </header>
)

// 菜单项组件
const MenuItem = ({ route, selectedKeys, setSelectedKeys, openKeys, setOpenKeys }: any) => {
  const hasChildren = route.children && route.children.length > 0;

  // 处理无子菜单的菜单项
  if (!hasChildren && route.element) {
    return (
      <li>
        <Link
          to={route.path}
          className={`block py-3 px-6 text-gray-600 text-sm transition-all hover:text-blue-500 hover:bg-blue-50 ${selectedKeys.includes(route.key) ? 'text-blue-500 bg-blue-50 border-r-4 border-blue-500' : ''}`}
          onClick={() => setSelectedKeys([route.key])}
        >
          {route.name}
        </Link>
      </li>
    );
  }

  // 处理有子菜单的菜单项
  if (hasChildren) {
    return (
      <li className="m-0">
        <div
          className="flex justify-between items-center py-3 px-6 text-sm font-medium text-gray-700 cursor-pointer transition-all hover:bg-gray-100"
          onClick={() => setOpenKeys(openKeys.includes(route.key) ? openKeys.filter((k: string) => k !== route.key) : [...openKeys, route.key])}
        >
          <span>{route.name}</span>
          <span className={`text-xs transition-transform duration-300 ${openKeys.includes(route.key) ? 'transform rotate-180' : ''}`}>▼</span>
        </div>
        {openKeys.includes(route.key) && (
          <ul className="list-none p-0 m-0">
            {route.children.map((child: any) => (
              <MenuItem
                key={child.key}
                route={child}
                selectedKeys={selectedKeys}
                setSelectedKeys={setSelectedKeys}
                openKeys={openKeys}
                setOpenKeys={setOpenKeys}
              />
            ))}
          </ul>
        )}
      </li>
    );
  }

  return null;
};

// 左侧菜单组件
export const SideMenu = () => {
  const [openKeys, setOpenKeys] = useState<string[]>(['components']);
  const [selectedKeys, setSelectedKeys] = useState<string[]>(['home']);
  const menuItems = generateMenuItems(routeConfig);

  // 监听路由变化，更新选中状态
  React.useEffect(() => {
    const location = window.location.pathname;
    const matchingRoute = routeConfig.find(route => {
      if (route.path === location) return true;
      if (route.children) {
        return route.children.some(child => child.path === location);
      }
      return false;
    });

    if (matchingRoute) {
      setSelectedKeys([matchingRoute.key as string]);
    }
  }, []);

  return (
    <aside className="w-50 bg-white border-r border-gray-200 overflow-y-auto py-4">
      <nav>
        <ul className="list-none p-0 m-0">
          {menuItems.map((route) => (
            <MenuItem
              key={route.key}
              route={route}
              selectedKeys={selectedKeys}
              setSelectedKeys={setSelectedKeys}
              openKeys={openKeys}
              setOpenKeys={setOpenKeys}
            />
          ))}
        </ul>
      </nav>
    </aside>
  )
}

// 内容区域包装器
export const ContentWrapper = ({ children }: { children: React.ReactNode }) => (
  <main className="flex-1 p-6 overflow-y-auto bg-gray-50">
    {children}
  </main>
)

function App() {
  const routes = generateRoutes(routeConfig);

  return (
    <Router>
      <Routes>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={<Layout>{route.element}</Layout>} />
        ))}
      </Routes>
    </Router>
  )
}

export default App