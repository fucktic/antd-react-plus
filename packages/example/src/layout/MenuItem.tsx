import { Link } from 'react-router-dom'

interface MenuItemProps {
  route: any
  selectedKeys: string[]
  setSelectedKeys: (keys: string[]) => void
  openKeys: string[]
  setOpenKeys: (keys: string[]) => void
}

// 菜单项组件
export const MenuItem = ({ route, selectedKeys, setSelectedKeys, openKeys, setOpenKeys }: MenuItemProps) => {
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
}

export default MenuItem