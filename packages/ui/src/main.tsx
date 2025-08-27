import React from 'react'
import ReactDOM from 'react-dom/client'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'
import { CascaderSecondary } from './components'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider locale={zhCN}>
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

    </ConfigProvider>
  </React.StrictMode>,
)