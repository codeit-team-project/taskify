import { useMutation, useQueryClient } from '@tanstack/react-query'
import styles from './Invitation.module.scss'

import { InvitationType } from '@/types/invitedDashBoardListType'
import { deleteDashBoardInvitation } from '@/api/dashboards/deleteDashboardsInvitations'

interface InvitationItemProps {
  dashBoardId: number
  invitation: InvitationType
}

export default function InvitationItem({ dashBoardId, invitation }: InvitationItemProps) {
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationKey: ['deleteInvitation'],
    mutationFn: ({ dashBoardId, invitationId }: { dashBoardId: number; invitationId: number }) =>
      deleteDashBoardInvitation({ dashBoardId, invitationId }),
    // 대시보드 삭제 성공 시, 캐시 업데이트 (delete 요청후에 get 요청이 간것을 확인할 수 있음)
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashBoardsInvitations', dashBoardId] })
    },
  })

  const handleDeleteInvitation = (invitationId: number) => () => {
    // 초대하기 취소
    console.log(invitationId)
    mutate({ dashBoardId, invitationId })
  }

  return (
    <div className={styles.invitee}>
      <span className={styles.email}>{invitation.invitee.email}</span>
      <button className={styles['cancle-button']} onClick={handleDeleteInvitation(invitation.id)}>
        취소
      </button>
    </div>
  )
}
