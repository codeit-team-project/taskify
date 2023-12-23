/**
 * @TODO 구성원 컴포넌트
 * 1. 반응형 스타일링
 * 2. 삭제 기능
 * 2. 삭제 버튼 UI 공통컴포넌트화 (세컨더리 버튼) (리팩토링)
 * 3. 유저프로필 이미지
 * 4. router path로 /dashboard/boardid/edit 페이지에서 대시보드 아이디 받기
 *
 * 추후 작업
 * default size 값 확인하기
 */
import { useEffect, useState } from 'react'
import { QueryClient, keepPreviousData, useQuery } from '@tanstack/react-query'
import styles from './Member.module.scss'

import { getDashBoardMembers } from '@/api/members/getMembers'
import { DashBoardMembers } from '@/types/members'

import Member from './Member'
import Pagination from '@/components/pagination/Pagination'

interface MomberListProps {
  dashBoardId: number
}

const queryClient = new QueryClient()

export default function MemberList({ dashBoardId = 119 }: MomberListProps) {
  const [currentPage, setCurrentPage] = useState(1)

  // const queryClient = new QueryClient()

  const { data } = useQuery<DashBoardMembers>({
    queryKey: ['dashBoardMembers', dashBoardId, currentPage],
    queryFn: () => getDashBoardMembers(dashBoardId, currentPage),
    placeholderData: keepPreviousData,
    staleTime: 3000,
  })

  console.log(data)
  // console.log(isPlaceholderData)

  const lastPage = data?.totalCount !== undefined ? Math.ceil(data?.totalCount / 2) : ''

  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: ['dashBoardMembers', currentPage + 1],
      queryFn: () => getDashBoardMembers(dashBoardId, currentPage + 1),
    })
  }, [currentPage, dashBoardId])

  return (
    <section className={styles.container}>
      <div className={styles['card-info']}>
        <span className={styles['card-title']}>구성원</span>
        <div className={styles['card-action']}>
          <span className={styles.pages}>
            {lastPage} 페이지 중 {currentPage}
          </span>
          <Pagination
            count={data ? data?.totalCount : 0}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </div>
      </div>
      <h3 className={styles['sub-title']}>이름</h3>
      <div>
        {data?.members.map((member) => (
          <li key={member.id} className={styles.table}>
            <Member nickname={member.nickname} />
          </li>
        ))}
      </div>
    </section>
  )
}
