import { ReactNode, useEffect, useMemo, useRef, useState, CSSProperties, useImperativeHandle, ForwardedRef, UIEvent, forwardRef } from "react"
import Thumnb, { ThumbRef } from "./Thumnb"
import { ThumbData } from './interface'
import { isObject } from "../_unit/is"
import './index.css'
import { useWindowSize } from "react-use"

// 滚动条组件属性类型定义
type ScrollbarProps = {
    /**自定义类名 */
    className?: string,
    /**自定义样式 */
    style?: CSSProperties,
    /**滚动条类型 'track'(轨道式) | 'embed'(嵌入式) */
    type?: 'track' | 'embed',
    /**外层容器类名 */
    outerClass?: string,
    /**外层容器样式 */
    outerStyle?: CSSProperties,
    /**是否隐藏滚动条 */
    hide?: boolean,
    /**是否禁用水平滚动条 */
    disableHorizontal?: boolean,
    /**是否禁用垂直滚动条 */
    disableVertical?: boolean,
    /**子内容 */
    children: ReactNode
    /**滚动事件回调 */
    onScroll?: (e: UIEvent) => void
}

// 滚动条组件引用类型定义
export type ScrollbarRef = {
    /**滚动到指定位置 */
    onScrollTo: (options: number | ScrollToOptions) => void
    /**滚动到指定顶部位置 */
    onScrollToTop: (top: number) => void
    /**滚动到指定左侧位置 */
    onScrollLeft: (left: number) => void
}

// 常量定义
const THUMB_MIN_SIZE = 20; // 滚动条滑块最小尺寸
const TRACK_SIZE = 15; // 滚动条轨道尺寸

/**
 * 自定义滚动条组件
 * 提供美观、可定制的滚动条替代浏览器默认滚动条
 * @param props 组件属性
 * @param ref 组件引用
 */
export const Scrollbar = forwardRef<ScrollbarRef, ScrollbarProps>((props: ScrollbarProps, ref: ForwardedRef<ScrollbarRef>) => {
    // 解构属性并设置默认值
    const {
        className,
        style,
        type = 'embed',
        outerClass,
        outerStyle,
        hide,

        children,
        onScroll
    } = props

    // DOM引用
    const containerRef = useRef<HTMLDivElement>(null) // 滚动容器引用
    const horizontalThumbRef = useRef<ThumbRef>(null) // 水平滑块引用
    const verticalThumbRef = useRef<ThumbRef>(null) // 垂直滑块引用

    // 状态管理
    const [_hasHorizontalScrollbar, setHasHorizontalScrollbar] = useState<boolean>(false) // 是否需要水平滚动条
    const [_hasVerticalScrollbar, setHasVerticalScrollbar] = useState<boolean>(false) // 是否需要垂直滚动条
    const [horizontalData, setHorizontalData] = useState<ThumbData>() // 水平滑块数据
    const [verticalData, setVerticalData] = useState<ThumbData>() // 垂直滑块数据
    const [isBoth, setBoth] = useState<boolean>(false) // 是否同时显示水平和垂直滚动条

    const { height, width } = useWindowSize()
    // 计算是否显示水平滚动条
    const hasHorizontalScrollbar = useMemo(() => {
        return _hasHorizontalScrollbar
    }, [_hasHorizontalScrollbar])

    // 计算是否显示垂直滚动条
    const hasVerticalScrollbar = useMemo(() => {
        return _hasVerticalScrollbar
    }, [_hasVerticalScrollbar])

    /**
     * 获取容器尺寸并计算滚动条相关数据
     * 更新滚动条状态和尺寸信息
     */
    const getContainerSize = () => {
        if (containerRef.current) {
            const {
                clientWidth,
                clientHeight,
                offsetHeight,
                offsetWidth,
                scrollTop,
                scrollLeft,
                scrollWidth,
                scrollHeight
            } = containerRef.current
            // 获取容器是否包含水平滚动条|垂直滚动条
            const overviewHorizontal = ['auto', 'scroll'].includes(containerRef.current.style.overflowX)
            const overviewVertical = ['auto', 'scroll'].includes(containerRef.current.style.overflowY)

            // 判断是否需要水平和垂直滚动条
            const hasHorizontalBar = (scrollWidth > clientWidth) && overviewHorizontal
            const hasVerticalBar = (scrollHeight > clientHeight) && overviewVertical
            const both = hasHorizontalBar && hasVerticalBar
            setHasHorizontalScrollbar(hasHorizontalBar)
            setHasVerticalScrollbar(hasVerticalBar)
            setBoth(both)

            // 计算水平轨道宽度
            const horizontalTrackWidth =
                type === 'embed' && both
                    ? offsetWidth - TRACK_SIZE
                    : offsetWidth

            // 计算垂直轨道高度
            const verticalTrackHeight =
                type === 'embed' && both
                    ? offsetHeight - TRACK_SIZE
                    : offsetHeight

            // 计算水平滑块宽度（确保不小于最小尺寸）
            const horizontalThumbWidth = Math.round(
                horizontalTrackWidth /
                Math.min(
                    scrollWidth / clientWidth, // 内容宽度与容器宽度的比例
                    horizontalTrackWidth / THUMB_MIN_SIZE // 确保滑块不小于最小尺寸
                )
            )
            const maxHorizontalOffset = horizontalTrackWidth - horizontalThumbWidth  // 水平滑块最大偏移量
            const horizontalRadio = (scrollWidth - clientWidth) / maxHorizontalOffset  // 水平滚动比例

            // 计算垂直滑块高度（确保不小于最小尺寸）
            const verticalThumbHeight = Math.round(
                verticalTrackHeight /
                Math.min(
                    scrollHeight / clientHeight, // 内容高度与容器高度的比例
                    verticalTrackHeight / THUMB_MIN_SIZE // 确保滑块不小于最小尺寸
                )
            )
            const maxVerticalOffset = verticalTrackHeight - verticalThumbHeight // 垂直滑块最大偏移量
            const verticalRadio = (scrollHeight - clientHeight) / maxVerticalOffset // 垂直滚动比例

            // 更新水平滑块数据
            setHorizontalData({
                ratio: horizontalRadio,
                thumbSize: horizontalThumbWidth,
                max: maxHorizontalOffset,
            })
            // 更新垂直滑块数据
            setVerticalData({
                ratio: verticalRadio,
                thumbSize: verticalThumbHeight,
                max: maxVerticalOffset,
            })

            // 如果容器已有滚动位置，更新滑块位置
            if (scrollTop > 0) {
                const verticalOffset = Math.round(
                    scrollTop / (verticalData?.ratio ?? 1)
                )
                verticalThumbRef.current?.updateOffset(verticalOffset)
            }
            if (scrollLeft > 0) {
                const horizontalOffset = Math.round(
                    scrollLeft / (verticalData?.ratio ?? 1)
                )
                horizontalThumbRef.current?.updateOffset(horizontalOffset)
            }
        }
    }

    // 组件挂载时获取容器尺寸
    useEffect(() => {
        getContainerSize()
    }, [containerRef.current])

    // 处理容器大小变化
    const handleResize = () => {
        getContainerSize()
    }
    // 监听容器大小变化
    useEffect(() => {
        handleResize()

    }, [height, width])
    /**
     * 处理容器滚动事件
     * 根据容器滚动位置更新滑块位置
     */
    const handleScroll = (e: UIEvent<HTMLDivElement>) => {
        if (containerRef.current) {
            // 更新水平滑块位置
            if (hasHorizontalScrollbar) {
                const horizontalOffset = Math.round(
                    containerRef.current.scrollLeft / (horizontalData?.ratio ?? 1)
                )
                horizontalThumbRef.current?.updateOffset(horizontalOffset)
            }
            // 更新垂直滑块位置
            if (hasVerticalScrollbar) {
                const verticalOffset = Math.round(
                    containerRef.current.scrollTop / (verticalData?.ratio ?? 1)
                )
                verticalThumbRef.current?.updateOffset(verticalOffset)
            }
        }
        // 调用用户提供的滚动回调
        onScroll && onScroll(e)
    }

    /**
     * 处理水平滑块滚动
     * 根据滑块位置更新容器滚动
     */
    const handleHorizontalScroll = (offset: number) => {
        if (containerRef.current) {
            containerRef.current.scrollTo({
                left: offset * (horizontalData?.ratio ?? 1)
            })
        }
    }

    /**
     * 处理垂直滑块滚动
     * 根据滑块位置更新容器滚动
     */
    const handleVerticalScroll = (offset: number) => {
        if (containerRef.current) {
            containerRef.current.scrollTo({
                top: offset * (verticalData?.ratio ?? 1)
            })
        }
    }

    /**
     * 计算容器样式
     * 轨道式滚动条需要在内容区域添加内边距以避免内容被滚动条遮挡
     */

    const wrapperStyle = useMemo(() => {
        const styles: CSSProperties = {}
        if (type === 'track') {
            if (hasHorizontalScrollbar) {
                styles.paddingBottom = `${TRACK_SIZE}px`
            }
            if (hasVerticalScrollbar) {
                styles.paddingRight = `${TRACK_SIZE}px`
            }
        }
        return { ...styles, ...outerStyle }
    }, [hasHorizontalScrollbar, hasVerticalScrollbar])
    /**
     * 计算容器类名
     */
    const cls = useMemo(() => {
        return `scrollbar-wrapper scrollbar-wrapper-type-${type} ${isBoth ? 'scrollbar-wrapper-both' : ''} ${outerClass ?? ''}`
    }, [type, hasHorizontalScrollbar, hasVerticalScrollbar])

    /**
     * 滚动到指定位置
     * @param options {number | {left?: number, top?: number}} 滚动位置参数
     * @param y {number} 可选的垂直滚动位置
     */
    const onScrollTo = (
        options?:
            | number
            | {
                left?: number
                top?: number
            },
        y?: number
    ) => {
        if (isObject(options)) {
            (containerRef.current as HTMLElement).scrollTo(options)
        } else if (options || y) {
            (containerRef.current as HTMLElement).scrollTo(options as number, y as number)
        }
    }

    /**
     * 滚动到指定顶部位置
     * @param top {number} 顶部位置
     */
    const onScrollToTop = (top: number) => {
        (containerRef.current as HTMLElement).scrollTo({ top })
    }

    /**
     * 滚动到指定左侧位置
     * @param left {number} 左侧位置
     */
    const onScrollLeft = (left: number) => {
        (containerRef.current as HTMLElement).scrollTo({ left })
    }

    // 暴露方法给父组件
    useImperativeHandle(ref, () => ({
        onScrollTo,
        onScrollToTop,
        onScrollLeft,
    }))

    return (
        <div className={`${className ?? ''} relative ${cls} `} style={wrapperStyle} >
            {/* 滚动容器 */}
            <div ref={containerRef} className=" scrollbar-wrapper-container" onScroll={handleScroll} style={{ ...style }}>
                {children}
            </div>

            {/* 水平滚动条 */}
            {
                !hide && hasHorizontalScrollbar && (
                    <Thumnb
                        ref={horizontalThumbRef}
                        data={horizontalData as ThumbData}
                        direction="horizontal"
                        both={isBoth}
                        onScroll={handleHorizontalScroll}
                    />
                )
            }

            {/* 垂直滚动条 */}
            {
                !hide && hasVerticalScrollbar && (
                    <Thumnb
                        ref={verticalThumbRef}
                        data={verticalData as ThumbData}
                        direction="vertical"
                        both={isBoth}
                        onScroll={handleVerticalScroll}
                    />
                )
            }
        </div>
    )
})
export default Scrollbar
