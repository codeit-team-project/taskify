/**
 * 초대내역 컴포넌트
 * @TODO
 * 1. 대시보드 초대하고 response 확인하기 (default accepted 여부 확인 => null) (완료)
 * 2. 초대내역 불러오기 api 연동 (초대 했지만 당사자 승낙여부 기다리는 목록) (완료)
 * ㄴ inviteAccepted: null(초기)
 * 2-1. 당사자가 초대를 거절하면 초대 내역에서 미포함 됨
 * 2-2. 당자자가 초대를 수락하면 초대 내역에 미포함 => 구성원(멤버)에 포함됨
 * 3. 초대하기 버튼을 눌렀을때 초대가 되고, 내역에 반영 (완료)
 * ㄴ 중복으로 초대가 가능한 상황 발견
 * ㄴ 이미 멤버이면 conflict
 * 4. 취소하기 버튼을 눌렀을때 초대 취소가 되고, 내역에 반영 (완료)
 * 5. 초대하기 모달 상세 작업 (완료)
 * 6. 페이지네이션 기능 붙이기 (완료)
 * 7. 페이지에 들어갔을때 사이즈 재확인
 */
import { useEffect, useState } from 'react'
import { keepPreviousData, useQuery, useQueryClient } from '@tanstack/react-query'

import { getDashBoardInvitations } from '@/api/dashboards/getDashboardsInvitations'
import { InvitationsType } from '@/types/invitedDashBoardListType'

import styles from './Invitation.module.scss'
import InvitationItem from './InvitationItem'
// import { getDashBoardMembers } from '@/api/members/getMembers'
// import { DashBoardMembers } from '@/types/members'
import InvitationModal from './InvitationModal'
import Pagination from '../pagination/Pagination'

interface InvitationListProps {
  dashBoardId: number
}

export default function InvitationList({ dashBoardId = 119 }: InvitationListProps) {
  const queryClient = useQueryClient()

  const pageSize = 5 // data per page
  const [currentPage, setCurrentPage] = useState(1)
  const [isOpenModal, setIsOpenModal] = useState(false)

  const { data, isPlaceholderData } = useQuery<InvitationsType>({
    queryKey: ['dashBoardsInvitations', dashBoardId, currentPage],
    queryFn: () => getDashBoardInvitations(dashBoardId, currentPage, pageSize),
    placeholderData: keepPreviousData,
    staleTime: 3000,
  })
  console.log(data) // 삭제 예정

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

  /** 삭제 예정 */
  // const { data: aaa } = useQuery<DashBoardMembers>({
  //   queryKey: ['dashBoardMembers', dashBoardId],
  //   queryFn: () => getDashBoardMembers(dashBoardId),
  // })
  // console.log(aaa)

  return (
    <>
      <section className={styles.container}>
        <div className={styles.description}>
          <div className={styles.info}>
            <span className={styles.title}>초대 내역</span>
            <Pagination
              count={data ? data?.totalCount : 1}
              pageSize={pageSize}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          </div>
          <button onClick={handleOpenModal} className={styles.action}>
            <img src="assets/add_box.svg" />
            초대하기
          </button>
          <span className={styles.item}>이메일</span>
        </div>
        <div>
          {data?.invitations.map((invitation) => (
            <li key={invitation.id} className={styles.table}>
              <InvitationItem
                dashBoardId={dashBoardId}
                invitationId={invitation.id}
                email={invitation.invitee.email}
              />
            </li>
          ))}
        </div>
      </section>
      {isOpenModal && <InvitationModal dashBoardId={dashBoardId} onClose={handleCloseModal} />}
    </>
  )
}

/**
createdAt: "2023-12-24T19:40:39.203Z"
dashboard: {id: 119, title: 'A프로젝트'}
id: 64
inviteAccepted: null ***
invitee: {id: 88, email: 'dev_minji@taskify.com', nickname: '김민지'}
inviterUserId: 45 => 초대한 사람(=나) 아이디
teamId: "1-02"
updatedAt: "2023-12-24T19:40:39.203Z"
*/

/**
 * invitations: []
 * totalCount: 0
 */

// 초대아이디 69, invitee id 89
