import { useRouter } from 'next/router'

import DashboardLayout from '@/components/ui/layout/DashboardLayout'

export default function DashBoardDetailPage() {
  const router = useRouter()
  const boardId = router.query.id

  return <DashboardLayout boardId={Number(boardId)}>대시보드 상세 페이지</DashboardLayout>
}
