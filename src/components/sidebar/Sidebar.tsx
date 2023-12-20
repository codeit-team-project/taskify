import Image from 'next/image'

import { DASH_BOARD_DATA } from '@/mock/dashBoard'
import SidebarItem from './SidebarItem'
import styles from './Sidebar.module.scss'

export default function Sidebar() {
  return (
    <section className={styles.container}>
      <div className={styles.logo}>
        <Image src="assets/large_logo.svg" alt="로고" width={29} height={34} priority />
        <Image
          src="assets/large_Taskify.svg"
          className={styles['logo-text']}
          alt="로고"
          width={80}
          height={22}
          priority
        />
      </div>
      <div className={styles['title-wrapper']}>
        <span className={styles.title}>Dash Boards</span>
        <button className={styles.action}>
          <Image src="assets/add_box.svg" alt="대시보드 추가하기 버튼" fill />
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
