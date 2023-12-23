import { Dispatch, SetStateAction, useEffect } from 'react'
import styles from './Pagination.module.scss'
import { getDashBoardMembers } from '@/api/members/getMembers'
import { QueryClient } from '@tanstack/react-query'

interface PaginationProps {
  count: number
  currentPage: number
  setCurrentPage: Dispatch<SetStateAction<number>>
}
// const queryClient = new QueryClient()

export default function Pagination({ count, currentPage, setCurrentPage }: PaginationProps) {
  const lastPage = count !== null ? Math.ceil(count / 2) : 0

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

  // useEffect(() => {
  //   // 만약에 호출해야할 데이터가 있다면 prefetch를 해줘
  //   queryClient.prefetchQuery({
  //     queryKey: ['dashBoardMembers', currentPage + 1],
  //     queryFn: () => getDashBoardMembers(119, currentPage + 1),
  //   })
  // }, [currentPage, queryClient])

  return (
    <div>
      <button
        onClick={handlePrevPage}
        className={(styles['arrow-button'], styles.forward, forwardButtonDefaultStyle)}
      >
        <img src="arrow_forward.svg" alt="구성원보기" />
      </button>
      <button
        onClick={handleNextPage}
        className={(styles['arrow-button'], styles.next, nextButtonDefaultStyle)}
      >
        <img src="arrow_next.svg" alt="구성원보기" />
      </button>
    </div>
  )
}
