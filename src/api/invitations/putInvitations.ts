import axiosInstance from '@/commons/lib/axiosInstance'
import { InvitedAcceptedType } from '@/types/invitations'
import { InvitationType } from '@/types/invitedDashBoardListType'

interface PutInvitationsType {
  id: number
  data: InvitedAcceptedType
}

export const putInvitations = async ({ id, data }: PutInvitationsType) => {
  const response = await axiosInstance.put<InvitationType>(`/invitations/${id}`, data)
  return response.data
}
