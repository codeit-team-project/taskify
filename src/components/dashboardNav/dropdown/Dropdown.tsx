/* 드롭다운 컴포넌트 

- MybouardNav, DashboardNav 컴포넌트의 프로필을 누르면 드롭다운 메뉴가 나옴
*/

import Link from 'next/link'
import styles from './Dropdown.module.scss'
import { removeCookie } from '@/utils/cookie'
import { useRouter } from 'next/router'

export default function Dropdown() {
  const router = useRouter()
  const handleLogout = () => {
    removeCookie('accessToken')
    alert('로그아웃 되었습니다!')
    router.push('/')
  }

  return (
    <div className={styles['dropmenu-container']}>
      <div className={styles['button-container']}>
        <button className={styles['menu-button']} onClick={handleLogout}>
          로그아웃
        </button>
      </div>
      <div className={styles['button-container']}>
        <button className={styles['menu-button']}>
          <Link href="/my">내 정보</Link>
        </button>
      </div>
      <div className={styles['button-container']}>
        <button className={styles['menu-button']}>
          <Link href="/mydashboard">내 대시보드</Link>
        </button>
      </div>
    </div>
  )
}
