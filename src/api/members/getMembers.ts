import axiosInstance from '@/commons/lib/axiosInstance'
import { DashBoardMembers } from '@/types/members'

export const getDashBoardMembers = async (
  dashBoardId: number,
  currentPage?: number,
  size?: number,
) => {
  const QUERY_STRING = `${currentPage ? `&page=${currentPage}` : ''}${size ? `&size=${size}` : ''}`

  const response = await axiosInstance.get<DashBoardMembers>(
    `/members?dashboardId=${dashBoardId}${QUERY_STRING}`,
  )
  return response.data
}
