import React from 'react'
import { Button } from 'antd-react-plus-ui'

const ButtonPage = () => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="mb-8 pb-6 border-b border-gray-100">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">按钮 Button</h1>
        <p className="text-gray-600">按钮用于触发一个操作，如提交表单、打开对话框等。</p>
      </div>

      <div className="bg-gray-50 rounded-lg p-8 mb-8 text-center">
        <div className="flex justify-center gap-4 flex-wrap">
          <Button type="primary">主要按钮</Button>
          <Button>默认按钮</Button>
          <Button type="dashed">虚线按钮</Button>
          <Button type="text">文本按钮</Button>
          <Button type="link">链接按钮</Button>
        </div>
      </div>

      <div className="mb-8">
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">何时使用</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>标记和触发一个操作，如提交表单、删除数据等。</li>
            <li>使用不同样式的按钮来表示不同的操作优先级。</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-6">代码演示</h2>
          
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-700 mb-3">1. 基本用法</h3>
            <p className="text-gray-600 mb-4">通过 type 语法糖，使用预设的按钮样式：主按钮、次按钮、虚线按钮、文本按钮和链接按钮。</p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex gap-3 flex-wrap">
                <Button type="primary">主要按钮</Button>
                <Button>默认按钮</Button>
                <Button type="dashed">虚线按钮</Button>
                <Button type="text">文本按钮</Button>
                <Button type="link">链接按钮</Button>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-700 mb-3">2. 图标按钮</h3>
            <p className="text-gray-600 mb-4">可以通过 icon 属性添加图标。</p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex gap-3 flex-wrap">
                <Button type="primary" icon="search">搜索</Button>
                <Button icon="download">下载</Button>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-700 mb-3">3. 按钮尺寸</h3>
            <p className="text-gray-600 mb-4">按钮有大、中、小三种尺寸。</p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex gap-3 flex-wrap">
                <Button type="primary" size="large">大按钮</Button>
                <Button type="primary">默认按钮</Button>
                <Button type="primary" size="small">小按钮</Button>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-700 mb-3">4. 加载状态</h3>
            <p className="text-gray-600 mb-4">添加 loading 属性即可让按钮处于加载状态。</p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex gap-3 flex-wrap">
                <Button type="primary" loading>加载中</Button>
                <Button type="primary" loading={false}>点击加载</Button>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-700 mb-3">5. 幽灵按钮</h3>
            <p className="text-gray-600 mb-4">幽灵按钮将按钮的内容反色，背景变为透明，常用在有色背景上。</p>
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex gap-3 flex-wrap">
                <Button type="primary" ghost>幽灵按钮</Button>
                <Button ghost>幽灵按钮</Button>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-700 mb-3">6. 自定义属性</h3>
            <p className="text-gray-600 mb-4">自定义的扩展属性。</p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <Button type="primary" customProp="前缀">
                带自定义前缀的按钮
              </Button>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">API</h2>
          <div className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
            <pre className="font-mono text-sm text-gray-700 whitespace-pre-wrap">
{`interface ButtonProps extends AntButtonProps {
  /** 自定义属性 */
  customProp?: string;
}`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ButtonPage