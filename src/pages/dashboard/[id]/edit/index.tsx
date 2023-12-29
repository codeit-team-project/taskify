import { useRouter } from 'next/router'

import EditDashboard from '@/components/dashboard/EditDashboard'
import DashboardLayout from '@/components/ui/layout/DashboardLayout'

export default function DashBoardDetailPage() {
  const router = useRouter()
  const boardId = router.query.id

  return (
    <DashboardLayout boardId={Number(boardId)}>
      <EditDashboard boardId={Number(boardId)} />
    </DashboardLayout>
  )
}
