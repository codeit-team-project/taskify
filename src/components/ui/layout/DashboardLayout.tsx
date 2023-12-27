/* 레이아웃 컴포넌트

TODO - 시간 난다면 theme 도 개발해보기.
- 인자로 children(필수)과 theme(옵션) 을 받습니다.
- /board, /board/{boardid} 페이지는 nav에 유저 정보와 대시보드 정보 모두 
  나타내기 때문에 MyPageLayout과 분리해둠.
*/

import { ReactNode } from 'react'
import DashboardNav from '@/components/dashboardNav/DashboardNav'
import Sidebar from '@/components/sidebar/Sidebar'
import { DashBoardType } from '@/types/dashBoardType'
import styles from './Layout.module.scss'

interface DashboradLayoutProps {
  children: ReactNode
  dashboardInfo?: DashBoardType
}

export default function DashboardLayout({ children, dashboardInfo }: DashboradLayoutProps) {
  return (
    <>
      <DashboardNav dashboardInfo={dashboardInfo} />
      <Sidebar />
      <article className={styles['article-content']}>{children}</article>
    </>
  )
}
