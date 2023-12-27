/* DashboardNav 바 컴포넌트

- MyPageLayout 컴포넌트를 감싸는 컴포넌트
- 내 대시보드, 계정관리 페이지 위에 보이는 DashboardNav 바 컴포넌트
 */

import Link from 'next/link'
import styles from './BoardNav.module.scss'
import Dropdown from './dropdown/Dropdown'
import useDropdown from '@/hooks/useDropdown'
import NavProfile from './navProfile/NavProfile'

interface MyboardNavProps {
  pageTitle?: 'mydashboard' | 'my'
}

export default function MyboardNav({ pageTitle }: MyboardNavProps) {
  const [isVisible, handleOpenDropdown, handleCloseDropdown] = useDropdown()

  return (
    <nav className={styles['nav-container']}>
      <div className={styles['title-section']}>
        <Link href={`/${pageTitle}`}>
          {pageTitle === 'mydashboard' ? '내 대시보드' : '계정관리'}
        </Link>
      </div>
      <div className={styles['nav-info-section']}>
        <NavProfile onOpen={handleOpenDropdown} onClose={handleCloseDropdown} />
      </div>
      {isVisible && <Dropdown />}
    </nav>
  )
}
