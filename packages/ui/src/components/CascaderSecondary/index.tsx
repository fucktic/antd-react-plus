import { Button, Empty } from "antd";
import { theme } from "antd";
import './index.css'
import { useState } from "react";
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
  style?: React.CSSProperties,
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
  const { style, className } = props
  const { token } = theme.useToken()
  const mergedStyle = {
    ['--bg-color' as any]: token.colorBgLayout,
    ...style,
  }
  const { header, selected: { list, max = 500 } } = props
  const selecteds = {
    count: list.length,
    max
  }
  return (
    <div className={`w-full flex flex-col rounded-sm secondary-cascader-wrapper ${className}`} style={mergedStyle}>

      <Header header={header} selected={selecteds} />
      <div className="flex-1 grid grid-cols-3 body">
        <div className="col-span-2">
          <CascaderSecondaryPanel selected={selecteds} />
        </div>
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

type PanelProps = {
  selected: {
    count: number;
    max: number;
  }
}
export const CascaderSecondaryPanel = (props: PanelProps) => {
  //一级列表
  const [firstList, setFirstList] = useState([])
  //二级列表
  const [secondList, setSecondList] = useState([])



  return <div className="h-full w-full">{!firstList.length ? (<div className="h-full flex items-center justify-center"><Empty /></div>) : (
    <div className="h-full w-full relative">

    </div>
  )}
  </div>

}