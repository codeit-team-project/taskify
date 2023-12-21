// react-query 사용하기

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createDashBoard } from '@/api/dashboards/createDashboards'
import { geteDashBoardsList } from '@/api/dashboards/getDashboards'
import { geteDashBoardsDetail } from '@/api/dashboards/getDashboardsDetail'
import { editDashBoard } from '@/api/dashboards/editDashboards'
import { deleteDashBoard } from '@/api/dashboards/deleteDashboards'
import { createDashBoardInvitations } from '@/api/dashboards/createDashboardsInvitations'
import { geteDashBoardInvitations } from '@/api/dashboards/getDashboardsInvitations'

export default function ApiTest() {
  const queryClient = useQueryClient()

  // 1. 대시보드 생성하기
  const { mutate } = useMutation({ mutationFn: createDashBoard })

  const handleCreateDashBoard = async () => {
    try {
      const res = await mutate({ title: 'Sample Dashboard', color: '#123456' })
      console.log(res) // 응답은 가는데 왜 res가 undefined인지 모르겠다
    } catch (error) {
      console.log(error)
    }
  }

  // 2. 대시보드 목록조회
  // prettier-ignore
  const { data: dashBoardsList } = useQuery({ queryKey: ['dashBoards'], queryFn: geteDashBoardsList })
  console.log(dashBoardsList)

  // 3. 대시보드 상세조회
  const boardId = 60
  const { data: dashBoardsDetail } = useQuery({
    queryKey: ['dashBoardsDetail', boardId],
    queryFn: () => geteDashBoardsDetail(boardId),
  })
  console.log(dashBoardsDetail)

  // 4. 대시보드 수정
  interface DashBoard {
    title: string
    color: string
  }

  const mutation = useMutation({
    mutationFn: ({ id, dashboardData }: { id: number; dashboardData: DashBoard }) => {
      return editDashBoard(id, dashboardData)
    },
  })

  const handleEditDashBoard = async () => {
    try {
      const res = await mutation.mutate({
        id: 57,
        dashboardData: { title: 'Edit Dashboard', color: '#ffffff' },
      })
      console.log(res) // 응답은 가는데 왜 res가 undefined인지 모르겠다
    } catch (error) {
      console.log(error)
    }
  }

  // 5. 대시보드 삭제
  const deleteMutation = useMutation({
    mutationFn: (dashBoardId: number) => deleteDashBoard(dashBoardId),
    // 대시보드 삭제 성공 시, 캐시 업데이트 (delete 요청후에 get 요청이 간것을 확인할 수 있음)
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashBoards'] }) // 'dashboards'는 해당 데이터 캐시 키
    },
  })

  const handleDeleteDashBoard = () => {
    try {
      deleteMutation.mutate(57)
    } catch (error) {
      console.log(error)
    }
  }

  // 6. 대시보드 초대하기
  const { mutate: createInvitations } = useMutation({ mutationFn: createDashBoardInvitations })

  const handleCreateInvitations = async () => {
    try {
      const res = await createInvitations({
        id: 60,
        data: {
          email: 'sohyun@taskify.com', // 이미 초대된 멤버라서 추가 테스트 못함
        },
      })
      console.log(res) // 응답은 가는데 왜 res가 undefined인지 모르겠다
    } catch (error) {
      console.log(error)
    }
  }

  // 7. 대시보드 초대 불러오기
  const { data: dashBoardsInvitations } = useQuery({
    queryKey: ['dashBoardsInvitations', boardId],
    queryFn: () => geteDashBoardInvitations(boardId),
  })
  console.log(dashBoardsInvitations)

  return (
    <>
      <h2>뮤테이션 관련 테스트 버튼</h2>
      <h3>대시보드 생성하기</h3>
      <button onClick={handleCreateDashBoard}>대시보드 생성 버튼</button>
      <h3>대시보드 상세 조회</h3>
      <button onClick={handleEditDashBoard}>대시보드 상세 조회 버튼</button>
      <h3>대시보드 삭제</h3>
      <button onClick={handleDeleteDashBoard}>대시보드 삭제 버튼</button>
      <h3>대시보드 초대</h3>
      <button onClick={handleCreateInvitations}>대시보드 초대 버튼</button>
    </>
  )
}
