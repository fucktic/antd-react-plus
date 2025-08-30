const Home = () => {
  return (
    <div className="max-w-3xl mx-auto text-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Antd React Plus 组件库</h1>
      <p className="text-lg text-gray-600 mb-8">基于 React 19、TypeScript 和 Ant Design 的现代化组件库</p>


      {/* Tailwind CSS 测试 */}
      <div className="mt-8 bg-blue-50 p-6 rounded-lg border border-blue-200">
        <h3 className="text-xl font-bold text-blue-800">Tailwind CSS 已成功集成！</h3>
        <p className="text-blue-700">这是使用 Tailwind CSS 工具类样式化的文本</p>
      </div>
    </div>
  )
}

export default Home