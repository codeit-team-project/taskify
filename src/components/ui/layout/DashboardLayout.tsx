/* 레이아웃 컴포넌트

- 인자로 children를 받습니다.
- /board, /board/{boardid} 페이지는 nav에 유저 정보와 대시보드 정보 모두 
  나타내기 때문에 MyPageLayout과 분리해둠.
*/

import { ReactNode } from 'react'

import DashboardNav from '@/components/dashboardNav/DashboardNav'
import Sidebar from '@/components/sidebar/Sidebar'
import styles from './Layout.module.scss'

interface DashboardLayoutProps {
  children: ReactNode
  boardId: number
}

export default function DashboardLayout({ children, boardId }: DashboardLayoutProps) {
  return (
    <>
      <DashboardNav boardId={boardId} />
      <Sidebar />
      <article className={styles['article-content']}>{children}</article>
    </>
  )
}
