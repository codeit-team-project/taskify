import { DASH_BOARD_DATA } from '@/mock/dashBoard'
import SidebarItem from './SidebarItem'
import styles from './Sidebar.module.scss'

export default function Sidebar() {
  console.log(DASH_BOARD_DATA) // 삭제 예정

  return (
    <section className={styles.container}>
      <div className={styles.logo}>
        <img src="large_logo.svg" />
        <img src="large_Taskify.svg" />
      </div>
      <div className={styles['title-wrapper']}>
        <span className={styles.title}>Dash Boards</span>
        <button className={styles.action}>
          <img src="add_box.svg" />
        </button>
      </div>
      <div>
        {DASH_BOARD_DATA.dashboards.map((board) => (
          <li key={board.id} className={styles.menus}>
            <SidebarItem board={board} />
          </li>
        ))}
      </div>
    </section>
  )
}
