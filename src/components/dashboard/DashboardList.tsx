import { useQuery } from '@tanstack/react-query'

import DashboardItem from './DashboardItem'

import { getDashBoardList } from '@/api/dashboards/getDashboards'
import { DashBoardListType } from '@/types/dashBoardType'

export default function DashboardList() {
  const { data } = useQuery<DashBoardListType>({
    queryKey: ['dashBoards'],
    queryFn: getDashBoardList,
  })

  return (
    <section>
      {data?.dashboards.map((dashboard) => (
        <li key={dashboard.id}>
          <DashboardItem
            dashBoardId={dashboard.id}
            title={dashboard.title}
            color={dashboard.color}
          />
        </li>
      ))}
      <div>페이지네이션</div>
    </section>
  )
}
