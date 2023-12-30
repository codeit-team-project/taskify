import { useRouter } from 'next/router'
import Link from 'next/link'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import styles from './index.module.scss'
import { deleteDashBoard } from '@/api/dashboards/deleteDashboards'

import EditDashboard from '@/components/dashboard/EditDashboard'
import DashboardLayout from '@/components/ui/layout/DashboardLayout'
import MemberList from '@/components/members/MemberList'
import InvitationList from '@/components/invitations/InvitationList'

export default function DashBoardDetailPage() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const boardId = Number(router.query.id)

  const { mutate: deleteMutation } = useMutation({
    mutationFn: (dashBoardId: number) => deleteDashBoard(dashBoardId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashBoards'] })
      router.push('/mydashboard')
    },
  })

  const handleDeleteDashboard = () => {
    deleteMutation(boardId)
  }

  return (
<<<<<<< HEAD
    <DashboardLayout boardId={Number(boardId)}>
      <EditDashboard boardId={Number(boardId)} />
=======
    <DashboardLayout>
      <div className={styles.container}>
        <div className={styles.action}>
          <Link href={`/dashboard/${boardId}`} className={styles.info}>
            <img src="/arrow_forward.svg" className={styles.icon} />
            <span className={styles.text}>돌아가기</span>
          </Link>
        </div>
        <EditDashboard dashBoardId={boardId} />
        <MemberList dashBoardId={boardId} />
        <InvitationList dashBoardId={boardId} />
        <div className={styles.wrapper}>
          <button className={styles.button} onClick={handleDeleteDashboard}>
            대시보드 삭제하기
          </button>
        </div>
      </div>
>>>>>>> 9778c1cb1b7270c763a402d0474bc5df2fe87cc1
    </DashboardLayout>
  )
}
