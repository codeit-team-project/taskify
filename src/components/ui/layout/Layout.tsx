/* 레이아웃 컴포넌트

TODO - 시간 난다면 theme 도 개발해보기.
- 인자로 children(필수)과 theme(옵션) 을 받습니다.
- 만약 router.pathname === "/" 이라면 MainNav와 Footer 컴포넌트 렌더링
- 만약 router.pathname === "/my" 라면 <DashboardNav whatPage="/my" />와 Sidebar 컴포넌트를 렌더링
- 만약 router.pathname === "/mydashboard" 라면 <DashboardNav whatPage="/mydashboard" />와 Sidebar 컴포넌트를 렌더링
- 만약 router.pathname === "그 외 다른 path" 라면 <DashboardNav whatPage="" />와 Sidebar 컴포넌트를 렌더링
*/

import { ReactNode } from 'react'
import { useRouter } from 'next/router'
import DashboardNav from '@/components/dashboardNav/DashboardNav'
import Footer from '@/components/footer/Footer'
import MainNav from '@/components/mainNav/MainNav'
import Sidebar from '@/components/sidebar/Sidebar'
import styles from './Layout.module.scss'

interface LayoutProps {
  children: ReactNode
  theme?: 'dark' | 'light'
}

export function Layout({ children, theme = 'dark' }: LayoutProps) {
  const router = useRouter()
  if (router.pathname === '/') {
    return (
      <>
        <MainNav theme={theme} />
        {children}
        <Footer />
      </>
    )
  }

  return (
    <>
      <DashboardNav whatPage={router.pathname} />
      <Sidebar />
      <article className={styles['article-content']}>{children}</article>
    </>
  )
}
