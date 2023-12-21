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
