// localhost:3000/dashboard 페이지
import MyPageLayout from '@/components/ui/layout/MypageLayout'
import ColumnList from '@/components/columns/columnList/ColumnList'

export default function DashBoardPage() {
  return (
    <MyPageLayout title="dashboard">
      <ColumnList />
    </MyPageLayout>
  )
}