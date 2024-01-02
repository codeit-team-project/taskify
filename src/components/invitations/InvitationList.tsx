/**
 * 초대내역 컴포넌트
 * @TODO
 * 페이지에 들어갔을때 사이즈 재확인
 * 반응형 스타일 재점검
 */
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { keepPreviousData, useQuery, useQueryClient } from '@tanstack/react-query'

import styles from './Invitation.module.scss'
import { getDashBoardInvitations } from '@/api/dashboards/getDashboardsInvitations'
import { InvitationsType } from '@/types/invitedDashBoardListType'

import InvitationItem from './InvitationItem'
import InvitationModal from './InvitationModal'
import Pagination from '@/components/pagination/Pagination'
import NodataUI from '@/components/ui/nodataUI/NodataUI'
import ModalContainer from '@/components/dashboardModal/ModalContainer'

interface InvitationListProps {
  dashBoardId: number
}

export default function InvitationList({ dashBoardId }: InvitationListProps) {
  const queryClient = useQueryClient()

  const pageSize = 5 // data per page
  const [currentPage, setCurrentPage] = useState(1)
  const [isOpenModal, setIsOpenModal] = useState(false)

  const { data, isPlaceholderData } = useQuery<InvitationsType>({
    queryKey: ['dashBoardsInvitations', dashBoardId, currentPage],
    queryFn: () => getDashBoardInvitations(dashBoardId, currentPage, pageSize),
    placeholderData: keepPreviousData,
    staleTime: 3000,
    enabled: !!dashBoardId,
  })

  const handleOpenModal = () => {
    setIsOpenModal(true)
  }

  const handleCloseModal = () => {
    setIsOpenModal(false)
  }

  const hasMorePage = data && currentPage < Math.ceil(data?.totalCount / pageSize)

  // Prefetch the next page
  useEffect(() => {
    if (!isPlaceholderData && hasMorePage) {
      queryClient.prefetchQuery({
        queryKey: ['dashBoardsInvitations', dashBoardId, currentPage + 1],
        queryFn: () => getDashBoardInvitations(dashBoardId, currentPage + 1, pageSize),
      })
    }
  }, [currentPage, dashBoardId, isPlaceholderData, hasMorePage, queryClient])

  return (
    <>
      <section className={styles.container}>
        <div className={styles.description}>
          <div className={styles.info}>
            <span className={styles.title}>초대 내역</span>
            {data?.totalCount !== 0 && (
              <Pagination
                count={data ? data?.totalCount : 1}
                pageSize={pageSize}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
              />
            )}
          </div>
          <button onClick={handleOpenModal} className={styles.action}>
            <img src="/assets/add_box_white.svg" alt="초대하기" />
            초대하기
          </button>
          <span className={styles.item}>이메일</span>
        </div>
        <div>
          {data?.totalCount === 0 ? (
            <NodataUI text="초대 내역이 없어요" />
          ) : (
            <>
              {data?.invitations.map((invitation) => (
                <li key={invitation.id} className={styles.table}>
                  <InvitationItem
                    dashBoardId={dashBoardId}
                    invitationId={invitation.id}
                    email={invitation.invitee.email}
                  />
                </li>
              ))}
            </>
          )}
        </div>
      </section>
      {isOpenModal &&
        createPortal(
          <ModalContainer onClose={handleCloseModal}>
            <InvitationModal dashBoardId={dashBoardId} onClose={handleCloseModal} />
          </ModalContainer>,
          document.getElementById('modal-root') as HTMLElement,
        )}
    </>
  )
}
