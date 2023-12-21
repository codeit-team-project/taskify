import axiosInstance from '@/commons/lib/axiosInstance'
import { InvitationsAboutMeType } from '@/types/invitations'

// 실제 해당 api 사용하실때 쿼리스트링 수정해서 사용해주세요.

export const geteDashBoardList = async () => {
  const response = await axiosInstance.get<InvitationsAboutMeType>('/invitations')
  return response.data
}
