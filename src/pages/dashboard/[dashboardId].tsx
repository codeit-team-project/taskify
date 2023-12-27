// localhost:3000/dashboard/{dashboardId} 페이지

import DashboardLayout from '@/components/ui/layout/DashboardLayout'
import { DashBoardType } from '@/types/dashBoardType'
// 임시로 쓸 목업 데이터
const MOCK_UP_DATA: DashBoardType = {
  id: 0,
  title: 'string',
  color: 'string',
  createdAt: '2023-12-27T05:04:54.268Z',
  updatedAt: '2023-12-27T05:04:54.268Z',
  createdByMe: true,
  userId: 0,
}

export default function DashBoardPage() {
  return (
    <>
      <DashboardLayout dashboardInfo={MOCK_UP_DATA}>
        <div>대시보드 페이지</div>
      </DashboardLayout>
    </>
  )
}
