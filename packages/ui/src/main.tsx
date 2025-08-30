import React from 'react'
import ReactDOM from 'react-dom/client'
import { ConfigProvider, Space } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'
import { CascaderSecondary, Scrollbar } from './components'
import './index.css'
import { ScrollbarDemo } from './components/Scrollbar/demo'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider locale={zhCN}>
      <Space direction='vertical' className='w-full' >
        <div className='bg-white p-4'>

          <CascaderSecondary
            header={{
              title: '授权账户',
              customTitle: '推广账户',
              selectedTitle: '已选',
            }}
            selected={{
              list: [],
              max: 10,
            }}

          />

        </div>
        <div className='bg-white p-4'>
          <ScrollbarDemo />
        </div>
      </Space>
    </ConfigProvider>
  </React.StrictMode>,
)