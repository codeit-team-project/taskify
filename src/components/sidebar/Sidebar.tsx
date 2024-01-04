import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { createPortal } from 'react-dom'
import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames'

import styles from './Sidebar.module.scss'
import { getDashBoardList } from '@/api/dashboards/getDashboards'
import SidebarItem from './SidebarItem'

import { DashBoardListType } from '@/types/dashBoardType'
import NewDashboardModal from '@/components/dashboard/NewDashboardModal'
import ModalContainer from '@/components/dashboardModal/ModalContainer'

export default function Sidebar() {
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const currentPage = Number(router.query.id)

  const { data } = useQuery<DashBoardListType>({
    queryKey: ['dashBoards'],
    queryFn: () => getDashBoardList(),
  })

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const onClose = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <section className={styles.container}>
        <div className={styles.logo}>
          <Link href={'/mydashboard'}>
            <Image src="/assets/large_logo.svg" alt="로고" width={29} height={34} priority />
            <Image
              src="/assets/large_Taskify.svg"
              className={styles['logo-text']}
              alt="로고"
              width={80}
              height={22}
              priority
            />
          </Link>
        </div>
        <div className={styles['title-wrapper']}>
          <span className={styles.title}>Dash Boards</span>
          <button className={styles.action} onClick={handleOpenModal}>
            <Image src="/assets/add_box.svg" alt="대시보드 추가하기 버튼" fill />
          </button>
        </div>
        <div className={styles.list}>
          {data?.dashboards.map((board) => (
            <Link
              key={board.id}
              href={`/dashboard/${board.id}`}
              className={classNames(styles.menus, {
                [styles.current]: currentPage === board.id,
              })}
            >
              <SidebarItem board={board} />
            </Link>
          ))}
        </div>
      </section>
      {isModalOpen &&
        createPortal(
          <ModalContainer onClose={onClose}>
            <NewDashboardModal onClose={onClose} />
          </ModalContainer>,
          document.getElementById('modal-root') as HTMLElement,
        )}
    </>
  )
}
