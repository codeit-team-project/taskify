import axiosInstance from '@/commons/lib/axiosInstance'
import { InvitationsValue } from '@/types/invitations'
import { InvitationType } from '@/types/invitedDashBoardListType'

interface CreateInvitationsType {
  id: number
  data: InvitationsValue
}

export const createDashBoardInvitations = async ({ id, data }: CreateInvitationsType) => {
  const response = await axiosInstance.post<InvitationType>(`/dashboards/${id}/invitations`, data)
  return response.data
}
