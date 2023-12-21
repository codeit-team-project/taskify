import { useState } from 'react'
import styles from './Pagination.module.scss'

interface PaginationProps {
  // handleDashBoardMembers: (startPage: number, id?: number) => Promise<void>
  handleDashBoardMembers: any
  count: number
}

// api 연동 후 삭제 예정
const TEST_BOARD_ID = 21

export default function Pagination({ handleDashBoardMembers, count }: PaginationProps) {
  const [startPage, setStartPage] = useState(1)
  const lastPage = count !== null ? Math.ceil(count / 2) : 0

  const forwardButtonDefaultStyle = startPage === 1 ? styles['forward-default'] : ''
  const nextButtonDefaultStyle = startPage === lastPage ? styles['next-default'] : ''

  const handlePrevPage = () => {
    if (startPage === 1) return
    setStartPage((prev) => prev - 1)
    handleDashBoardMembers(startPage - 1, TEST_BOARD_ID)
  }

  const handleNextPage = () => {
    if (startPage === lastPage) return
    setStartPage((prev) => prev + 1)
    handleDashBoardMembers(startPage + 1, TEST_BOARD_ID)
  }

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
