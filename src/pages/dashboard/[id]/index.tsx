import { useRouter } from 'next/router'

import DashboardLayout from '@/components/ui/layout/DashboardLayout'
import ColumnList from '@/components/columns/columnList/ColumnList'

export default function DashBoardDetailPage() {
  const router = useRouter()
  const boardId = router.query.id

  return (
    <DashboardLayout boardId={Number(boardId)}>
      <ColumnList boardId={Number(boardId)} />
    </DashboardLayout>
  )
}
