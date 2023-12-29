import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'
import styles from './DashboardList.module.scss'

import DashboardItem from './DashboardItem'

import { getDashBoardList } from '@/api/dashboards/getDashboards'
import { DashBoardListType } from '@/types/dashBoardType'

export default function DashboardList() {
  const router = useRouter()

  const { data } = useQuery<DashBoardListType>({
    queryKey: ['dashBoards'],
    queryFn: getDashBoardList,
  })

  const handleMoveToPage = (boardId: number) => () => {
    router.push(`/dashboard/${boardId}`)
  }
  console.log(data) // 삭제예정

  return (
    <section>
      <div className={styles.boards}>
        <div className={styles['add-button']}>
          <span className={styles.title}>새로운 대시보드</span>
          <img src="/assets/add_fill_primary.svg" className={styles['add-icon']} />
        </div>
        {data?.dashboards.map((dashboard) => (
          <li key={dashboard.id} className={styles.list} onClick={handleMoveToPage(dashboard.id)}>
            <DashboardItem title={dashboard.title} color={dashboard.color} />
          </li>
        ))}
      </div>
      <div>페이지네이션</div>
    </section>
  )
}
