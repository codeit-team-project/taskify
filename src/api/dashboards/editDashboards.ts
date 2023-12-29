import axiosInstance from '@/commons/lib/axiosInstance'
import { DashBoardType, DashBoardValueType } from '@/types/dashBoardType'

export const editDashBoard = async (dashBoardId: number, data: DashBoardValueType) => {
  const response = await axiosInstance.put<DashBoardType>(`/dashboards/${dashBoardId}`, data)
  return response.data
}
