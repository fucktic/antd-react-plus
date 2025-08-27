import React from 'react'
import { Header } from './Header'
import { SideMenu } from './SideMenu'
import { ContentWrapper } from './ContentWrapper'

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