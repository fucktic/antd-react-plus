import React from 'react'
import { Input } from 'antd-react-plus-ui'

const InputPage = () => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Input 组件</h2>
      <p className="text-gray-600 mb-6">增强版输入框组件，基于 Ant Design 的 Input 组件扩展</p>
      
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-700 mb-4">基本用法</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <Input placeholder="请输入内容" className="mb-4" />
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-700 mb-4">自定义前缀</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <Input placeholder="带自定义前缀的输入框" customPrefix="$" />
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium text-gray-700 mb-4">API</h3>
        <div className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
          <pre className="font-mono text-sm text-gray-700 whitespace-pre-wrap">
{`interface InputProps extends AntInputProps {
  /** 自定义前缀 */
  customPrefix?: string;
}`}
          </pre>
        </div>
      </div>
    </div>
  )
}

export default InputPage