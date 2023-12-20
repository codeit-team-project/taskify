import { useState } from 'react'
import styles from './Pagination.module.scss'

interface PaginationProps {
  // handleDashBoardMembers: (startPage: number, id?: number) => Promise<void>
  handleDashBoardMembers: any
  count: number
}

export default function Pagination({ handleDashBoardMembers, count }: PaginationProps) {
  //   const [currentPage, setCurrentPage] = useState(1)
  const [startPage, setStartPage] = useState(1)
  const lastPage = count !== null ? Math.ceil(count / 2) : 0

  const handlePrevPage = () => {
    if (startPage === 1) return
    setStartPage((prev) => prev - 1)
    handleDashBoardMembers(startPage - 1, 21)
  }

  const handleNextPage = () => {
    if (startPage === lastPage) return
    setStartPage((prev) => prev + 1)
    handleDashBoardMembers(startPage + 1, 21)
  }

  return (
    <div>
      <button onClick={handlePrevPage} className={styles['left-arrow-button']}>
        <img src="arrow_forward.svg" alt="구성원보기" />
      </button>
      <button onClick={handleNextPage} className={styles['right-arrow-button']}>
        <img src="arrow_next.svg" alt="구성원보기" />
      </button>
    </div>
  )
}
