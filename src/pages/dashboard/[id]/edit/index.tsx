import { useRouter } from 'next/router'

import EditDashboard from '@/components/dashboard/EditDashboard'
import DashboardLayout from '@/components/ui/layout/DashboardLayout'
import MemberList from '@/components/members/MemberList'
import InvitationList from '@/components/invitations/InvitationList'

export default function DashBoardDetailPage() {
  const router = useRouter()
  const boardId = Number(router.query.id)

  return (
    <DashboardLayout>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.2rem',
        }}
      >
        <EditDashboard boardId={boardId} />
        <MemberList dashBoardId={boardId} />
        <InvitationList dashBoardId={boardId} />
      </div>
    </DashboardLayout>
  )
}
