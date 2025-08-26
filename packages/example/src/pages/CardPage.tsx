import React from 'react'
import { Card } from 'antd-react-plus-ui'
import { ReactNode } from 'react'

const CardPage = () => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Card 组件</h2>
      <p className="text-gray-600 mb-6">增强版卡片组件，基于 Ant Design 的 Card 组件扩展</p>
      
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-700 mb-4">基本用法</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <Card title="基本卡片" className="mb-4">
            卡片内容
          </Card>
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-700 mb-4">自定义标题</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <Card customTitle={<span className="text-blue-500">自定义标题</span>}>
            带自定义标题的卡片
          </Card>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium text-gray-700 mb-4">API</h3>
        <div className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
          <pre className="font-mono text-sm text-gray-700 whitespace-pre-wrap">
{`interface CardProps extends AntCardProps {
  /** 自定义卡片标题 */
  customTitle?: ReactNode;
}`}
          </pre>
        </div>
      </div>
    </div>
  )
}

export default CardPage