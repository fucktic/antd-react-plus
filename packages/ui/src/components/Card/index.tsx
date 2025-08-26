import React from 'react';
import { Card as AntCard, CardProps as AntCardProps } from 'antd';
import type { ReactNode } from 'react';

interface CardProps extends AntCardProps {
  /** 自定义卡片标题 */
  customTitle?: ReactNode;
}

/**
 * 增强版卡片组件
 * 基于 Ant Design 的 Card 组件扩展
 */
export const Card: React.FC<CardProps> = ({
  title,
  customTitle,
  children,
  ...props
}) => {
  return (
    <AntCard title={customTitle || title} {...props}>
      {children}
    </AntCard>
  );
};

Card.displayName = 'Card';

export default Card;