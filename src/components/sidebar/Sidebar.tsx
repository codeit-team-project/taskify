import { DASH_BOARD_DATA } from '@/mock/dashBoard'
import SidebarItem from './SidebarItem'
import styles from './Sidebar.module.scss'

export default function Sidebar() {
  console.log(DASH_BOARD_DATA) // 삭제 예정

  return (
    <section className={styles.container}>
      <div className={styles.logo}>
        <img src="large_logo.svg" alt="로고" />
        <img src="large_Taskify.svg" className={styles['logo-text']} alt="로고" />
      </div>
      <div className={styles['title-wrapper']}>
        <span className={styles.title}>Dash Boards</span>
        <button className={styles.action}>
          <img src="add_box.svg" alt="대시보드 추가하기 버튼" style={{ width: '100%' }} />
        </button>
      </div>
      <div style={{ width: '100%', height: '100%' }}>
        {DASH_BOARD_DATA.dashboards.map((board) => (
          <li key={board.id} className={styles.menus}>
            <SidebarItem board={board} />
          </li>
        ))}
      </div>
    </section>
  )
}
