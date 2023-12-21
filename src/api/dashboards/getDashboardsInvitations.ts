import axiosInstance from '@/commons/lib/axiosInstance'
import { InvitationsType } from '@/types/invitedDashBoardListType'

// page, size를 인자로 받아서 쿼리스트링을 만들 수 있습니다.
// 쿼리스트링 부분 수정해서 사용해주세요.

export const getDashBoardInvitations = async (dashBoardId: number) => {
  const response = await axiosInstance.get<InvitationsType>(
    `/dashboards/${dashBoardId}/invitations`,
  )
  return response.data
}
