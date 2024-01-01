import axiosInstance from '@/commons/lib/axiosInstance'
import { PutInvitationType } from '@/types/invitations'
import { InvitationType } from '@/types/invitedDashBoardListType'

export const putInvitation = async ({ id, inviteAccepted }: PutInvitationType) => {
  const response = await axiosInstance.put<InvitationType>(`/invitations/${id}`, {
    inviteAccepted,
  })
  return response.data
}
