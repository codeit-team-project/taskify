/* 드롭다운 컴포넌트 

TODO - 로그아웃 기능은 이전 pr 중 react cookie pr이 머지된 후 해당 코드를 써서 작성할 것
- MybouardNav, DashboardNav 컴포넌트의 프로필을 누르면 드롭다운 메뉴가 나옴
*/

import Link from 'next/link'
import styles from './Dropdown.module.scss'

export default function Dropdown() {
  return (
    <div className={styles['dropmenu-container']}>
      <div className={styles['button-container']}>
        <button className={styles['menu-button']}>로그아웃</button>
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
