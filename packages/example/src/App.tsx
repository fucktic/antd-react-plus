import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './layout/index'
import { routeConfig, generateRoutes } from './router/routes.tsx'

function App() {
  const routes = generateRoutes(routeConfig);
  console.log('生成的路由配置:', routes);

  return (
    <Router basename="/antd-react-plus">
      <Routes >
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={<Layout>{route.element}</Layout>} />
        ))}
      </Routes>
    </Router>
  )
}

export default App