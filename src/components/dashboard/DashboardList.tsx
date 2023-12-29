import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { keepPreviousData, useQuery, useQueryClient } from '@tanstack/react-query'
import styles from './DashboardList.module.scss'

import DashboardItem from './DashboardItem'
import NewDashboardModal from './NewDashboardModal'
import Pagination from '@/components/pagination/Pagination'

import { getDashBoardList } from '@/api/dashboards/getDashboards'
import { DashBoardListType } from '@/types/dashBoardType'

export default function DashboardList() {
  const router = useRouter()
  const queryClient = useQueryClient()

  const pageSize = 5 // data per page
  const [currentPage, setCurrentPage] = useState(1)
  const [isOpenModal, setIsOpenModal] = useState(false)

  const { data, isPlaceholderData } = useQuery<DashBoardListType>({
    queryKey: ['dashBoards', currentPage, pageSize],
    queryFn: () => getDashBoardList(currentPage, pageSize),
    placeholderData: keepPreviousData,
    staleTime: 3000,
  })

  const handleMoveToPage = (boardId: number) => () => {
    router.push(`/dashboard/${boardId}`)
  }
  console.log(data) // 삭제예정

  const handleOpenModal = () => {
    setIsOpenModal(true)
  }

  const hasMorePage = data && currentPage < Math.ceil(data?.totalCount / pageSize)

  // Prefetch the next page
  useEffect(() => {
    if (!isPlaceholderData && hasMorePage) {
      queryClient.prefetchQuery({
        queryKey: ['dashBoards', currentPage + 1],
        queryFn: () => getDashBoardList(currentPage + 1, pageSize),
      })
    }
  }, [currentPage, isPlaceholderData, hasMorePage, queryClient])

  return (
    <>
      <section className={styles.container}>
        <div className={styles.boards}>
          <div className={styles['add-button']} onClick={handleOpenModal}>
            <span className={styles.title}>새로운 대시보드</span>
            <img src="/assets/add_fill_primary.svg" className={styles['add-icon']} />
          </div>
          {data?.dashboards.map((dashboard) => (
            <li key={dashboard.id} className={styles.list} onClick={handleMoveToPage(dashboard.id)}>
              <DashboardItem
                title={dashboard.title}
                color={dashboard.color}
                createdByMe={dashboard.createdByMe}
              />
            </li>
          ))}
        </div>
        <div className={styles.page}>
          <Pagination
            count={data ? data?.totalCount : 1}
            pageSize={pageSize}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </section>
      {isOpenModal && <NewDashboardModal onClose={() => setIsOpenModal(false)} />}
    </>
  )
}
