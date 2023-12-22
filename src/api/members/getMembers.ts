import axiosInstance from '@/commons/lib/axiosInstance'
import { DashBoardMembers } from '@/types/members'

// 실제 해당 api 사용하실때 쿼리스트링 수정해서 사용해주세요.

export const getDashBoardMembers = async (dashBoardId: number) => {
  const response = await axiosInstance.get<DashBoardMembers>(`/members?dashboardId=${dashBoardId}`)
  return response.data
}
