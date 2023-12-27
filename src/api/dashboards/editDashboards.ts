import axiosInstance from '@/commons/lib/axiosInstance'
import { DashBoardType, DashBoardVauleType } from '@/types/dashBoardType'

export const editDashBoard = async (dashBoardId: number, data: DashBoardVauleType) => {
  const response = await axiosInstance.put<DashBoardType>(`/dashboards/${dashBoardId}`, data)
  return response.data
}
