import axiosInstance from '@/commons/lib/axiosInstance'

interface DeleteInvitationType {
  dashBoardId: number
  invitationId: number
}

export const deleteDashBoardInvitation = async ({
  dashBoardId,
  invitationId,
}: DeleteInvitationType) => {
  await axiosInstance.delete(`/dashboards/${dashBoardId}/invitations/${invitationId}`)
}
