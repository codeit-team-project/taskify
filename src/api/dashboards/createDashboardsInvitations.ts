import axiosInstance from '@/commons/lib/axiosInstance'
import { InvitationsValue } from '@/types/invitations'
// import { AxiosError } from 'axios'
import { InvitationType } from '@/types/invitedDashBoardListType'

interface CreateInvitationsType {
  id: number
  data: InvitationsValue
}

export const createDashBoardInvitations = async ({ id, data }: CreateInvitationsType) => {
  const response = await axiosInstance.post<InvitationType>(`/dashboards/${id}/invitations`, data)
  return response.data

  /** 여기에서 try..catch로 에러처리 하는 방법이 옳은 지 */
  // try {
  //   const response = await axiosInstance.post<InvitationType>(`/dashboards/${id}/invitations`, data)
  //   return response.data
  // } catch (error) {
  //   if (error instanceof AxiosError) {
  //     // console.log(error.response?.data) // {message: '이메일 형식이 올바르지 않습니다.'}
  //     return error.response?.data
  //   }
  // }
}
