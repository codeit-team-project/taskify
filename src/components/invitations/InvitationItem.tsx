import { useMutation, useQueryClient } from '@tanstack/react-query'
import styles from './Invitation.module.scss'

import { deleteDashBoardInvitation } from '@/api/dashboards/deleteDashboardsInvitations'

interface InvitationItemProps {
  dashBoardId: number
  invitationId: number
  email: string
}

export default function InvitationItem({ dashBoardId, invitationId, email }: InvitationItemProps) {
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationKey: ['deleteInvitation'],
    mutationFn: (data: { dashBoardId: number; invitationId: number }) =>
      deleteDashBoardInvitation(data.dashBoardId, data.invitationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashBoardsInvitations', dashBoardId] })
    },
  })

  const handleDeleteInvitation = (invitationId: number) => () => {
    mutate({
      dashBoardId,
      invitationId,
    })
  }

  return (
    <div className={styles.invitee}>
      <span className={styles.email}>{email}</span>
      <button className={styles['cancle-button']} onClick={handleDeleteInvitation(invitationId)}>
        취소
      </button>
    </div>
  )
}
