import React from 'react'
import ReactDOM from 'react-dom/client'
import 'antd-react-plus-ui/dist/index.css'
import App from './App'
import './index.css'
import { ConfigProvider } from 'antd';




ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider theme={{
      cssVar: true,
      hashed: false
    }} >
      <App />
    </ConfigProvider>

  </React.StrictMode>
);