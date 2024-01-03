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

/**
 * @TODO
 * 동적으로 title 생성하기
 * 일단 고정 meta 데이터로 해놓고, 추후 작업 진행하기
 * 
export async function getStaticPaths() {
  const data = await getDashBoardList()
  const paths = data.dashboards.map((dashboard) => ({
    params: { id: dashboard.id },
  }))
  console.log(paths)

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }: any) {
  const dashboard = await getDashBoardsDetail(params.id)

  return {
    props: {
      dashboard,
    },
  }
}
 */
