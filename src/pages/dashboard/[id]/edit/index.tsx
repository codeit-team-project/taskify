import { useRouter } from 'next/router'

import styles from './index.module.scss'

import EditDashboard from '@/components/dashboard/EditDashboard'
import DashboardLayout from '@/components/ui/layout/DashboardLayout'
import MemberList from '@/components/members/MemberList'
import InvitationList from '@/components/invitations/InvitationList'

export default function DashBoardDetailPage() {
  const router = useRouter()
  const boardId = Number(router.query.id)

  return (
    <DashboardLayout>
      <div className={styles.container}>
        <div className={styles.action}>
          <img src="/arrow_forward.svg" className={styles.icon} />
          <span className={styles.text}>돌아가기</span>
        </div>
        <EditDashboard boardId={boardId} />
        <MemberList dashBoardId={boardId} />
        <InvitationList dashBoardId={boardId} />
        <div className={styles.wrapper}>
          <button className={styles.button}>대시보드 삭제하기</button>
        </div>
      </div>
    </DashboardLayout>
  )
}
