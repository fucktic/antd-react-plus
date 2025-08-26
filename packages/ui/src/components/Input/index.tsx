import React from 'react';
import { Input as AntInput, InputProps as AntInputProps } from 'antd';

interface InputProps extends AntInputProps {
  /** 自定义前缀 */
  customPrefix?: string;
}

/**
 * 增强版输入框组件
 * 基于 Ant Design 的 Input 组件扩展
 */
export const Input: React.FC<InputProps> = ({
  customPrefix,
  prefix,
  ...props
}) => {
  return (
    <AntInput 
      prefix={customPrefix || prefix}
      {...props}
    />
  );
};

Input.displayName = 'Input';

export default Input;