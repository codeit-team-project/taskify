import { Dispatch, SetStateAction } from 'react'
import classNames from 'classnames'
import styles from './Pagination.module.scss'

interface PaginationProps {
  count: number
  pageSize: number
  currentPage: number
  setCurrentPage: Dispatch<SetStateAction<number>>
}

export default function Pagination({
  count,
  pageSize,
  currentPage,
  setCurrentPage,
}: PaginationProps) {
  const lastPage = count === 1 ? '' : Math.ceil(count / pageSize)

  const forwardButtonStyle = classNames(styles.forward, {
    [styles['forward-default']]: currentPage === 1,
  })
  const nextButtonStyle = classNames(styles.next, {
    [styles['next-default']]: currentPage === lastPage,
  })

  const handlePrevPage = () => {
    if (currentPage === 1) return
    setCurrentPage((prev) => prev - 1)
  }

  const handleNextPage = () => {
    if (currentPage === lastPage) return
    setCurrentPage((prev) => prev + 1)
  }

  return (
    <div className={styles['card-action']}>
      <span className={styles.pages}>
        {lastPage} 페이지 중 {currentPage}
      </span>
      <div>
        <button onClick={handlePrevPage} className={forwardButtonStyle}>
          <img src="arrow_forward.svg" alt="구성원보기" />
        </button>
        <button onClick={handleNextPage} className={nextButtonStyle}>
          <img src="arrow_next.svg" alt="구성원보기" />
        </button>
      </div>
    </div>
  )
}
