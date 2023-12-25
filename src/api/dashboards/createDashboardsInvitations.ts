import axiosInstance from '@/commons/lib/axiosInstance'
import { InvitationsValue } from '@/types/invitations'
import { AxiosError } from 'axios'
import { InvitationType } from '@/types/invitedDashBoardListType'

interface CreateInvitationsType {
  id: number
  data: InvitationsValue
}

export const createDashBoardInvitations = async ({ id, data }: CreateInvitationsType) => {
  try {
    const response = await axiosInstance.post<InvitationType>(`/dashboards/${id}/invitations`, data)
    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      // console.log(error.response?.data) // {message: '이메일 형식이 올바르지 않습니다.'} -> 머지 전 주석 삭제 예정
      return error.response?.data
    }
  }
}
