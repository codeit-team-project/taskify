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

  return (
    <section>
      <div className={styles.boards}>
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
