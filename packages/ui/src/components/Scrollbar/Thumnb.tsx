import { forwardRef, useImperativeHandle, useMemo, useRef, useState } from "react"
import { ThumbMap, ThumbData } from "./interface"
import { off, on } from "../_unit/dom"
import './index.css'

// 滑块组件属性类型定义
export type ThumbProps = {
    /**滑块数据，包含尺寸、最大偏移等信息 */
    data: ThumbData
    /**滑块方向 'horizontal'(水平) | 'vertical'(垂直) */
    direction: 'horizontal' | 'vertical'
    /**是否始终显示 */
    alwaysShow?: boolean
    /**是否同时显示水平和垂直滚动条 */
    both?: boolean
    /**滚动回调函数 */
    onScroll: (offset: number) => void
}

// 定义暴露给父组件的实例类型
export type ThumbRef = {
    /**更新滑块位置 */
    updateOffset: (offset: number) => void
}

/**
 * 滚动条滑块组件
 * 负责处理滚动条的拖动、点击等交互行为
 * @param props 组件属性
 * @param ref 组件引用
 */
const Thumnb = forwardRef<ThumbRef, ThumbProps>((props: ThumbProps, ref: React.ForwardedRef<ThumbRef>) => {
    // 解构属性
    const { data, direction, onScroll } = props

    // DOM引用
    const trackRef = useRef<HTMLDivElement>(null) // 轨道元素引用
    const thumbRef = useRef<HTMLDivElement>(null) // 滑块元素引用

    // 状态管理
    const [isDragging, setIsDragging] = useState(false) // 是否正在拖动滑块
    const [offset, setOffset] = useState(0) // 滑块当前偏移量
    const [mouseOffset, setMouseOffset] = useState(0) // 鼠标在滑块内的偏移量

    // 向父组件暴露方法
    useImperativeHandle(ref, () => {
        return {
            updateOffset
        }
    })

    /**
     * 计算滑块的类名
     * 根据方向和拖拽状态添加不同的类
     */
    const thumbCls = useMemo(() => {
        return ` scrollbar-wrapper-thumb  scrollbar-wrapper-thumb-direction-${direction}  ${isDragging ? 'scrollbar-wrapper-thumb-dragging' : ''} `
    }, [direction, isDragging])

    /**
     * 根据滚动方向生成属性映射
     * 水平和垂直方向使用不同的CSS属性和事件属性
     */
    const trumbMap: ThumbMap = useMemo(() => {
        if (direction === 'horizontal') {
            return {
                size: 'width',
                direction: 'left',
                offset: 'offsetWidth',
                client: 'clientX',
            }
        }
        return {
            size: 'height',
            direction: 'top',
            offset: 'offsetHeight',
            client: 'clientY',
        }
    }, [direction])

    /**
     * 计算滑块的样式
     * 设置滑块的尺寸和位置
     */
    const trumbStyle = useMemo(() => {
        return {
            [trumbMap.size]: `${data?.thumbSize ?? 0}px`, // 滑块尺寸
            [trumbMap.direction]: `${offset}px`, // 滑块位置偏移
        }
    }, [isDragging, offset, data])

    /**
     * 获取合法的偏移量
     * 确保偏移量在有效范围内（0到最大值之间）
     * @param offset 原始偏移量
     * @returns 调整后的合法偏移量
     */
    const getLegalOffSet = (offset: number) => {
        if (offset < 0) {
            return 0
        }
        if (data && offset > data.max) {
            return data.max
        }
        return offset
    }

    /**
     * 处理滑块鼠标按下事件
     * 开始拖动滑块
     */
    const handleThumbMouseDown = (e: React.MouseEvent) => {
        e.stopPropagation()
        if (thumbRef.current && trackRef.current) {
            // 计算鼠标在滑块内的相对位置
            setMouseOffset(e[trumbMap.client] -
                thumbRef.current.getBoundingClientRect()[trumbMap.direction]
            )
            setIsDragging(true)
            // 添加全局鼠标事件监听
            on(window, 'mousemove', handleMouseMove)
            on(window, 'mouseup', handleMouseUp);
            on(window, 'contextmenu', handleMouseUp); // 右键也停止拖动
        }
    }

    /**
     * 处理鼠标移动事件
     * 更新滑块位置并触发滚动回调
     */
    const handleMouseMove = (e: MouseEvent) => {
        if (trackRef.current && thumbRef.current) {
            // 计算新的偏移量（考虑轨道位置和鼠标在滑块内的偏移）
            const _offset = getLegalOffSet(
                e[trumbMap.client] -
                trackRef.current.getBoundingClientRect()[trumbMap.direction] -
                mouseOffset
            )
            if (_offset !== offset) {
                setOffset(_offset)
                onScroll(_offset); // 触发滚动回调
            }
        }
    }

    /**
     * 处理鼠标抬起事件
     * 结束拖动状态，移除全局事件监听
     */
    const handleMouseUp = () => {
        setIsDragging(false)
        off(window, 'mousemove', handleMouseMove);
        off(window, 'mouseup', handleMouseUp);
    };

    /**
     * 处理轨道点击事件
     * 点击轨道时，滑块向点击方向移动一个滑块宽度/高度的距离
     */
    const handleTrackClick = (e: React.MouseEvent) => {
        e.stopPropagation()
        if (thumbRef.current && trackRef.current) {
            // 根据点击位置决定滑块移动方向
            const _offset = getLegalOffSet(
                e[trumbMap.client] >
                    thumbRef.current.getBoundingClientRect()[trumbMap.direction]
                    ? offset + (data.thumbSize ?? 0) // 点击滑块右侧，向右移动
                    : offset - (data.thumbSize ?? 0) // 点击滑块左侧，向左移动
            )
            if (_offset !== offset) {
                setOffset(_offset)
                onScroll(_offset) // 触发滚动回调
            }
        }
    }

    /**
     * 更新滑块位置
     * 由父组件通过ref调用，用于同步滚动位置
     * @param _offset 新的偏移量
     */
    const updateOffset = (_offset: number) => {
        // 拖动过程中不响应外部更新
        if (!isDragging) {
            _offset = getLegalOffSet(_offset) // 确保偏移量合法
            if (_offset !== offset) {
                setOffset(_offset)
            }
        }
    }

    // 渲染滚动条轨道和滑块
    return (
        <div ref={trackRef} className={`scrollbar-wrapper-track scrollbar-wrapper-track-direction-${direction}`} onMouseDown={handleTrackClick}>
            <div ref={thumbRef} className={thumbCls} style={trumbStyle} onMouseDown={handleThumbMouseDown}>
                <div className="scrollbar-wrapper-thumb-bar"></div>
            </div>
        </div>
    )
})

export default Thumnb