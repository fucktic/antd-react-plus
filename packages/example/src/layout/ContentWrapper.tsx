import React from 'react'

interface ContentWrapperProps {
  children: React.ReactNode
}

// 内容区域包装器
export const ContentWrapper = ({ children }: ContentWrapperProps) => (
  <main className="flex-1 p-6 overflow-y-auto bg-gray-50">
    {children}
  </main>
)

export default ContentWrapper