/**
 * @TODO 구성원 컴포넌트
 * 1. 버튼 UI 공통컴포넌트화 (세컨더리 버튼) (리팩토링)
 */
import { useEffect, useState } from 'react'
import { keepPreviousData, useQuery, useQueryClient } from '@tanstack/react-query'
import styles from './Member.module.scss'

import { getDashBoardMembers } from '@/api/members/getMembers'
import { DashBoardMembers } from '@/types/members'

import Pagination from '@/components/pagination/Pagination'
import MemberItem from './MemberItem'

interface MomberListProps {
  dashBoardId: number
}

export default function MemberList({ dashBoardId = 119 }: MomberListProps) {
  const queryClient = useQueryClient()

  const pageSize = 4 // data per page
  const [currentPage, setCurrentPage] = useState(1)

  const { data, isPlaceholderData } = useQuery<DashBoardMembers>({
    queryKey: ['dashBoardMembers', dashBoardId, currentPage],
    queryFn: () => getDashBoardMembers(dashBoardId, currentPage, pageSize),
    placeholderData: keepPreviousData,
    staleTime: 3000,
    enabled: !!dashBoardId,
  })

  const hasMorePage = data && currentPage < Math.ceil(data?.totalCount / pageSize)

  // Prefetch the next page
  useEffect(() => {
    if (!isPlaceholderData && hasMorePage) {
      queryClient.prefetchQuery({
        queryKey: ['dashBoardMembers', dashBoardId, currentPage + 1],
        queryFn: () => getDashBoardMembers(dashBoardId, currentPage + 1, pageSize),
      })
    }
  }, [currentPage, dashBoardId, isPlaceholderData, hasMorePage, queryClient])

  return (
    <section className={styles.container}>
      <div className={styles['card-info']}>
        <span className={styles['card-title']}>구성원</span>
        <Pagination
          count={data ? data?.totalCount : 1}
          pageSize={pageSize}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
      <h3 className={styles['sub-title']}>이름</h3>
      <div>
        {data?.members.map((member) => (
          <li key={member.id} className={styles.table}>
            <MemberItem member={member} dashBoardId={dashBoardId} />
          </li>
        ))}
      </div>
    </section>
  )
}
