/* 레이아웃 컴포넌트

1. HomeLayout은 메인 렌딩페이지를 감싸는 레이아웃 컴포넌트
2. DashboardLayout은 나머지 페이지를 감싸는 레이아웃 컴포넌트
*/

import { PropsWithChildren } from 'react'
import { useRouter } from 'next/router'
import DashboardNav from '@/components/dashboardNav/DashboardNav'
import Footer from '@/components/footer/Footer'
import MainNav from '@/components/mainNav/MainNav'
import Sidebar from '@/components/sidebar/Sidebar'
import styles from './Layout.module.scss'

// 내 대시보드 Nav를 띄울 페이지
const MY_DASHBOARD_NAV = ['/mydashboard', '/my']

export function HomeLayout({ children }: PropsWithChildren) {
  return (
    <>
      <MainNav theme="dark" />
      {children}
      <Footer />
    </>
  )
}

export function DashboardLayout({ children }: PropsWithChildren) {
  const router = useRouter()
  return (
    <>
      <DashboardNav isMyDashboard={MY_DASHBOARD_NAV.includes(router.pathname)} />
      <Sidebar />
      <article className={styles['article-content']}>{children}</article>
    </>
  )
}
