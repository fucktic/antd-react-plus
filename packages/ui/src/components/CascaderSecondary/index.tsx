import { Button } from "antd";
import { theme } from "antd";
import './index.css'
type TypeHeader = {
  title: string;
  customTitle: string;
  selectedTitle?: string;
}
export type HeaderProps = {
  header: TypeHeader,
  selected: {
    count: number;
    max: number;
  }
}
export type CascaderSecondaryProps = {
  className?: string,
  styles?: React.CSSProperties,
  header: TypeHeader,
  //选中项
  selected: {
    list: []
    max: number;
  }
}


/**
 * 二级级联选择器组件
 * @param props 
 * @returns 
 */
export const CascaderSecondary = (props: CascaderSecondaryProps) => {
  const { styles, className } = props
  const { token } = theme.useToken()
  const style = {
    ['--bg-color' as any]: token.colorBgLayout,
    ...styles,
  }
  const { header, selected: { list, max = 500 } } = props

  return (
    <div className={`w-full flex flex-col rounded-sm  secondary-cascader-wrapper ${className}`} style={style}>

      <Header header={header} selected={{ count: list.length, max }} />
      <div className="flex-1 grid grid-cols-3 body">
        <div className="col-span-2">1</div>
        <div className="h-full relative overflow-hidden"></div>

      </div>
    </div>
  )
}
const Header = (props: HeaderProps) => {

  const { header: { title, customTitle, selectedTitle = '已选' }, selected: { count, max } } = props

  return (
    <div className="w-full grid grid-cols-3 header" >
      <div>{title}</div>
      <div>{customTitle}</div>
      <div className="flex items-center ">
        <div className="flex-1 text-start">
          <span>{selectedTitle}</span>
          <span>（{count} / {max}）</span>
        </div>
        <Button type="link"  >清空</Button>
      </div>
    </div>
  )
}

// const panelProps = {}
export const CascaderSecondaryPanel = () => {
  return (
    <div className="w-full h-full "></div>
  )
}