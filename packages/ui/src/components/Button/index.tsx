import React from 'react';
import { Button as AntButton, ButtonProps as AntButtonProps } from 'antd';

interface ButtonProps extends AntButtonProps {
  /** 自定义属性 */
  customProp?: string;
}

/**
 * 增强版按钮组件
 * 基于 Ant Design 的 Button 组件扩展
 */
export const Button: React.FC<ButtonProps> = ({
  children,
  customProp,
  ...props
}) => {
  return (
    <AntButton {...props}>
      {customProp && <span className="mr-2">{customProp}</span>}
      {children}
    </AntButton>
  );
};

Button.displayName = 'Button';

export default Button;