import axiosInstance from '@/commons/lib/axiosInstance'
import { DashBoardType } from '@/types/dashBoardType'

export const geteDashBoardsDetail = async (dashBoardId: number) => {
  const response = await axiosInstance.get<DashBoardType>(`/dashboards/${dashBoardId}`)
  return response.data
}
