import React from 'react'
import { Header, SideMenu, ContentWrapper } from './App'

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col h-screen w-full">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <SideMenu />
        <ContentWrapper>
          {children}
        </ContentWrapper>
      </div>
    </div>
  )
}

export default Layout