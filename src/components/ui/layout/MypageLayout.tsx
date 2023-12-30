/* /my, /mydashboard 페이지에 쓰는 레이아웃 컴포넌트

TODO - 시간 난다면 theme 도 개발해보기.
- 일반 dashboard 페이지와는 달리 /my, /mydashboard 페이지는 nav에 유저 정보만 나타내고
  대시보드 정보는 나타내지 않기 때문에 레이아웃을 분리해둠.
*/

import { ReactNode } from 'react'
import MyboardNav from '@/components/dashboardNav/MyboardNav'
import Sidebar from '@/components/sidebar/Sidebar'
import styles from './Layout.module.scss'

interface MyPageLayoutProps {
  children: ReactNode
  title: 'my' | 'mydashboard'
}

export default function MyPageLayout({ children, title }: MyPageLayoutProps) {
  return (
    <>
      <MyboardNav pageTitle={title} />
      <Sidebar />
      <article className={styles['article-content']}>{children}</article>
    </>
  )
}
