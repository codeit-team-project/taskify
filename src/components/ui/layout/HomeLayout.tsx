/* 메인 랜딩페이지에 쓸 레이아웃 컴포넌트

TODO - 시간 난다면 theme 도 개발해보기
- 인자로 children(필수)과 theme(옵션) 을 받습니다.
*/

import { ReactNode } from 'react'
import Footer from '@/components/footer/Footer'
import MainNav from '@/components/mainNav/MainNav'

interface HomeLayoutProps {
  children: ReactNode
  theme?: 'dark' | 'light'
}

export default function HomeLayout({ children, theme = 'dark' }: HomeLayoutProps) {
  return (
    <>
      <MainNav theme={theme} />
      {children}
      <Footer />
    </>
  )
}
