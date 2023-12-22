// ⭐️⭐️⭐️ react-query 사용하기 샘플 코드
// 이 파일을 나중에 삭제 예정입니다.

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createDashBoard } from '@/api/dashboards/createDashboards'
import { getDashBoardList } from '@/api/dashboards/getDashboards'
import { getDashBoardsDetail } from '@/api/dashboards/getDashboardsDetail'
import { editDashBoard } from '@/api/dashboards/editDashboards'
import { deleteDashBoard } from '@/api/dashboards/deleteDashboards'
import { createDashBoardInvitations } from '@/api/dashboards/createDashboardsInvitations'
import { getDashBoardInvitations } from '@/api/dashboards/getDashboardsInvitations'
import { DashBoardListType, DashBoardType } from '@/types/dashBoardType'
import { InvitationsType } from '@/types/invitedDashBoardListType'

export default function ApiTest() {
  const queryClient = useQueryClient()

  // 1. 대시보드 생성하기
  const { mutate } = useMutation({
    mutationFn: createDashBoard,
    onSuccess: (data) => {
      // 성공했을때 실행할 콜백
      console.log(data)
    },
  })

  // 1-1. 버튼 누르면 대시보드 생성하는 이벤트 핸들러
  const handleCreateDashBoard = () => {
    mutate({ title: 'Sample Dashboard', color: '#123456' })
  }

  // 2. 대시보드 목록조회
  const { data: dashBoardList } = useQuery<DashBoardListType>({
    queryKey: ['dashBoards'],
    queryFn: getDashBoardList,
  })
  console.log(dashBoardList)

  // 3. 대시보드 상세조회
  const boardId = 60
  const { data: dashBoardDetail } = useQuery<DashBoardType>({
    queryKey: ['dashBoardsDetail', boardId],
    queryFn: () => getDashBoardsDetail(boardId),
  })
  console.log(dashBoardDetail)

  // 4. 대시보드 수정
  const { mutate: editDashBoardMutation } = useMutation({
    mutationFn: editDashBoard,
    onSuccess: (data) => {
      // 성공했을때 실행할 콜백
      console.log(data)
    },
  })

  // 4-1. 버튼 누르면 대시보드 수정하는 이벤트 핸들러
  const handleEditDashBoard = () => {
    try {
      editDashBoardMutation({ dashBoardId: 65, data: { title: 'edit', color: '#ffffff' } })
    } catch (error) {
      console.log(error)
    }
  }

  // 5. 대시보드 삭제
  const { mutate: deleteMutation } = useMutation({
    mutationFn: (dashBoardId: number) => deleteDashBoard(dashBoardId),
    // 대시보드 삭제 성공 시, 캐시 업데이트 (delete 요청후에 get 요청이 간것을 확인할 수 있음)
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashBoards'] }) // 'dashboards'는 해당 데이터 캐시 키
    },
  })

  // 5-1. 버튼 누르면 대시보드 삭제하는 이벤트 핸들러
  const handleDeleteDashBoard = () => {
    try {
      deleteMutation(60)
    } catch (error) {
      console.log(error)
    }
  }

  // 6. 대시보드 초대하기
  const { mutate: createInvitations } = useMutation({
    mutationFn: createDashBoardInvitations,
    onSuccess: (data) => {
      console.log(data)
    },
  })

  // 6-1. 버튼 누르면 대시보드 초대하는 이벤트 핸들러
  const handleCreateInvitations = async () => {
    try {
      createInvitations({ id: 60, data: { email: 'sohyun@taskify.com' } }) // 이미 초대된 멤버임(참고)
    } catch (error) {
      console.log(error)
    }
  }

  // 7. 대시보드 초대 불러오기
  const { data: dashBoardsInvitations } = useQuery<InvitationsType>({
    queryKey: ['dashBoardsInvitations', boardId],
    queryFn: () => getDashBoardInvitations(boardId),
  })
  console.log(dashBoardsInvitations)

  return (
    <>
      <h2>뮤테이션 관련 테스트 버튼</h2>
      <h3>대시보드 생성하기</h3>
      <div style={{ padding: '1rem 0' }}>
        <button onClick={handleCreateDashBoard}>대시보드 생성 버튼</button>
      </div>
      <h3>대시보드 수정</h3>
      <div style={{ padding: '1rem 0' }}>
        <button onClick={handleEditDashBoard}>대시보드 수정 버튼</button>
      </div>
      <h3>대시보드 삭제</h3>
      <div style={{ padding: '1rem 0' }}>
        <button onClick={handleDeleteDashBoard}>대시보드 삭제 버튼</button>
      </div>
      <h3>대시보드 초대</h3>
      <div style={{ padding: '1rem 0' }}>
        <button onClick={handleCreateInvitations}>대시보드 초대 버튼</button>
      </div>
    </>
  )
}
