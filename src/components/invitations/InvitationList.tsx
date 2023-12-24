/**
 * 초대내역 컴포넌트
 * @TODO
 * 1. 대시보드 초대하고 response 확인하기 (default accepted 여부 확인 => null)
 * 2. 초대내역 불러오기 api 연동 (초대 했지만 당사자 승낙여부 기다리는 목록)
 * ㄴ inviteAccepted: null(초기)
 * 2-1. 당사자가 초대를 거절하면 초대 내역에 포함되는지 여부 확인
 * 2-2. 당자자가 초대를 수락하면 초대 내역에 미포함 => 구성원(멤버)에 포함됨
 * 3. 초대하기 버튼을 눌렀을때 초대가 되고, 내역에 반영
 * ㄴ 중복으로 초대가 가능한 상황 발견
 * ㄴ 이미 멤버이면 conflict
 * 4. 취소하기 버튼을 눌렀을때 초대 취소가 되고, 내역에 반영
 * 5. 초대하기 모달 상세 작업
 * 6. 페이지네이션 기능 붙이기
 */

import { useMutation, useQuery } from '@tanstack/react-query'

import { createDashBoardInvitations } from '@/api/dashboards/createDashboardsInvitations'
import { getDashBoardInvitations } from '@/api/dashboards/getDashboardsInvitations'
import { InvitationsType } from '@/types/invitedDashBoardListType'

import styles from './Invitation.module.scss'
import InvitationItem from './InvitationItem'

interface InvitationListProps {
  dashBoardId: number
}

export default function InvitationList({ dashBoardId = 119 }: InvitationListProps) {
  // 대시보드 초대하기
  const { mutate: createInvitations } = useMutation({
    mutationFn: createDashBoardInvitations,
    onSuccess: (data) => {
      console.log(data)
    },
  })

  // 버튼 누르면 대시보드 초대하는 이벤트 핸들러
  const handleCreateInvitation = async () => {
    try {
      createInvitations({ id: 119, data: { email: 'dev_junghyun@taskify.com' } })
    } catch (error) {
      console.log(error)
    }
  }

  const { data } = useQuery<InvitationsType>({
    queryKey: ['dashBoardsInvitations', dashBoardId],
    queryFn: () => getDashBoardInvitations(dashBoardId),
  })
  console.log(data)

  return (
    <section className={styles.container}>
      <div className={styles['card-info']}>
        <span className={styles['card-title']}>초대 내역</span>
        <div>페이지네이션</div>
        <button onClick={handleCreateInvitation}>초대하기</button>
      </div>
      <h3 className={styles['sub-title']}>이메일</h3>
      <div>
        {data?.invitations.map((invitation) => (
          <li key={invitation.id} className={styles.table}>
            <InvitationItem invitation={invitation} dashBoardId={dashBoardId} />
          </li>
        ))}
      </div>
    </section>
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