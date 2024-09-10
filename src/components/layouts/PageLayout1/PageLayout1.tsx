import { ReactNode, useState } from 'react'
import Header from '../../Header/Header'
import Sidebar from '../../Sidebar/Sidebar'
import './page-layout-1.css'

// This is PageLayout1. For some pages we might have different layouts
const PageLayout1 = ({
  children,
  pageTitle,
}: {
  children: ReactNode
  pageTitle: string
}) => {
  const [menuActive, setMenuActive] = useState(false)

  return (
    <div className="grid grid-cols-[1fr] sm:grid-cols-[0.3fr_1fr] grid-rows-[auto_1fr] grid-areas-header-sidebar-main h-screen">
      {/* in mobile view, a hamburger icon appears in header that opens the sidebar menu */}
      <Header title={pageTitle} menuClick={() => setMenuActive(true)} />
      {/* sidebar get's hidden in mobile view */}
      <Sidebar
        active={menuActive}
        closeButtonClick={() => setMenuActive(false)}
      />
      {/* main section is scrollable in itself, header and sidebar never leaves it's position */}
      <main className="bg-gray-200 overflow-y-scroll">{children}</main>
    </div>
  )
}

export default PageLayout1
