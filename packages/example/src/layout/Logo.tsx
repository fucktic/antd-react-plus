import { Link } from "react-router-dom"

// 模拟logo SVG
export const Logo = () => (
  <Link to="/" className="w-8 h-8">
    <img src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" draggable="false" alt="logo" />
  </Link>
)

export default Logo