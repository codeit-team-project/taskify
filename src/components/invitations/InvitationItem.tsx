import styles from './Invitation.module.scss'
import { InvitationType } from '@/types/invitedDashBoardListType'

interface InvitationItemProps {
  dashBoardId: number
  invitation: InvitationType
}

export default function InvitationItem({ dashBoardId, invitation }: InvitationItemProps) {
  console.log(dashBoardId)

  const handleDeleteInvitation = (id: number) => () => {
    // 초대하기 취소
    console.log(id)
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
