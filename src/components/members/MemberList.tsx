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

import { QueryClient, useQuery } from '@tanstack/react-query'
import styles from './Member.module.scss'
import p from '../pagination/Pagination.module.scss'

import { getDashBoardMembers } from '@/api/members/getMembers'
// import { getDashBoardList } from '@/api/dashboards/getDashboards'
import { DashBoardMembers } from '@/types/members'
// import { DashBoardListType } from '@/types/dashBoardType'

// import Pagination from '@/components/pagination/Pagination'
import Member from './Member'
import { useEffect, useState } from 'react'

interface MomberListProps {
  dashBoardId: number
}

export default function MemberList({ dashBoardId = 116 }: MomberListProps) {
  const [currentPage, setCurrentPage] = useState(1)

  const queryClient = new QueryClient()

  const { data, isPlaceholderData } = useQuery<DashBoardMembers>({
    queryKey: ['dashBoardMembers', dashBoardId, currentPage],
    queryFn: () => getDashBoardMembers(dashBoardId, currentPage),
  })

  console.log(data)
  console.log(isPlaceholderData)

  //******************************** */

  // const [startPage, setStartPage] = useState(1)
  const lastPage = data?.totalCount !== undefined ? Math.ceil(data?.totalCount / 2) : 0

  const forwardButtonDefaultStyle = currentPage === 1 ? styles['forward-default'] : ''
  const nextButtonDefaultStyle = currentPage === lastPage ? styles['next-default'] : ''

  const handlePrevPage = () => {
    if (currentPage === 1) return
    setCurrentPage((prev) => prev - 1)
  }

  const handleNextPage = () => {
    if (currentPage === lastPage) return
    setCurrentPage((prev) => prev + 1)
  }

  // hasMore 값 만들기..?

  useEffect(() => {
    // 만약에 호출해야할 데이터가 있다면 prefetch를 해줘
    if (!isPlaceholderData) {
      queryClient.prefetchQuery({
        queryKey: ['dashBoardMembers', currentPage + 1],
        queryFn: () => getDashBoardMembers(dashBoardId, currentPage + 1),
      })
    }
  }, [currentPage, dashBoardId, isPlaceholderData, queryClient])

  return (
    <section className={styles.container}>
      <div className={styles['card-info']}>
        <span className={styles['card-title']}>구성원</span>
        <div className={styles['card-action']}>
          <span className={styles.pages}>1 페이지 중 1</span>
          {/* <Pagination count={data ? data?.totalCount : 0} /> */}
          <div>
            <button
              onClick={handlePrevPage}
              className={(p['arrow-button'], p.forward, forwardButtonDefaultStyle)}
            >
              <img src="arrow_forward.svg" alt="구성원보기" />
            </button>
            <button
              onClick={handleNextPage}
              className={(p['arrow-button'], p.next, nextButtonDefaultStyle)}
            >
              <img src="arrow_next.svg" alt="구성원보기" />
            </button>
          </div>
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
