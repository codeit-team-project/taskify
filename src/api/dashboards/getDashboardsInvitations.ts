import axiosInstance from '@/commons/lib/axiosInstance'
import { InvitationsType } from '@/types/invitedDashBoardListType'

export const getDashBoardInvitations = async (
  dashBoardId: number,
  currentPage: number = 1,
  size: number = 5,
) => {
  const QUERY_STRING = `?page=${currentPage}&size=${size}`

  const response = await axiosInstance.get<InvitationsType>(
    `/dashboards/${dashBoardId}/invitations${QUERY_STRING}`,
  )
  return response.data
}
