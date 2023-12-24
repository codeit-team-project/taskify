import axiosInstance from '@/commons/lib/axiosInstance'

export const deleteDashBoardInvitation = async (dashBoardId: number, invitationId: number) => {
  await axiosInstance.delete(`/dashboards/${dashBoardId}/invitations/${invitationId}`)
}
