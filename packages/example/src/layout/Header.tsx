
import { Button } from 'antd-react-plus-ui'
import { Logo } from './Logo'
import { GithubOutlined } from '@ant-design/icons'

// 头部组件

export const Header = () => (
  <header className="flex justify-between items-center px-6 h-16 bg-white shadow-xs backdrop-blur-sm  z-10">
    <div className="flex items-center gap-3">
      <Logo />
      <span className="text-xl font-bold text-gray-800 m-0">Antd React +</span>
    </div>
    <div className="flex gap-4">
      <Button type="text" icon={<GithubOutlined />} style={{
        paddingInline: 0
      }}
        className='!text-base w-8 h-8'
        href='https://github.com/fucktic/antd-react-plus'
        target='_blank'
      >

      </Button>
    </div>
  </header>
)

export default Header