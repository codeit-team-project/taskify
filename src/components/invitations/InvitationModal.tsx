/**
 * @TODO 초대하기 모달
 * ㄴ 초대하기 버튼 누르면 초대하기 모달이 나타남 (완료)
 * ㄴ input으로 이메일을 입력하면 초대 버튼 활성화, 미입력시 비활성화, 최소 기능
 * ㄴ 버튼을 클릭했을 때 data 유효성 검사 (4가지 예외 상황)
 * ㄴ 예외 상황에 따른 에러 message 스타일링 (칼럼 모달 디자인 참고)
 * ㄴ 초대하기 버튼스타일링 (+ 빈응형)
 */
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createDashBoardInvitations } from '@/api/dashboards/createDashboardsInvitations'

interface InvitationModalProps {
  dashBoardId: number
}

export default function InvitationModal({ dashBoardId }: InvitationModalProps) {
  const queryClient = useQueryClient()

  const { mutate: createInvitation } = useMutation({
    mutationKey: ['createInvitation'],
    mutationFn: createDashBoardInvitations,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashBoardsInvitations', dashBoardId] })
    },
  })

  // 버튼 누르면 대시보드 초대하는 이벤트 핸들러
  const handleCreateInvitation = async () => {
    try {
      createInvitation({
        id: dashBoardId,
        data: {
          email: 'dev_code@taskify.com',
        },
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      초대하기 모달
      <button onClick={handleCreateInvitation}>초대하기</button>
    </div>
  )
}
