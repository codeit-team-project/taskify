import Image from 'next/image'
import { useQuery } from '@tanstack/react-query'

import styles from './Sidebar.module.scss'
import { getDashBoardList } from '@/api/dashboards/getDashboards'
import SidebarItem from './SidebarItem'

import { DashBoardListType } from '@/types/dashBoardType'

export default function Sidebar() {
  const { data } = useQuery<DashBoardListType>({
    queryKey: ['dashBoards'],
    queryFn: () => getDashBoardList(),
  })

  return (
    <section className={styles.container}>
      <div className={styles.logo}>
        <Image src="/assets/large_logo.svg" alt="로고" width={29} height={34} priority />
        <Image
          src="/assets/large_Taskify.svg"
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
          <Image src="/assets/add_box.svg" alt="대시보드 추가하기 버튼" fill />
        </button>
      </div>
      <div>
        {data?.dashboards.map((board) => (
          <li key={board.id} className={styles.menus}>
            <SidebarItem board={board} />
          </li>
        ))}
      </div>
    </section>
  )
}
