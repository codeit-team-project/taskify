import axiosInstance from '@/commons/lib/axiosInstance'
import { DashBoardType, DashBoardVauleType } from '@/types/dashBoardType'

export const createDashBoard = async (data: DashBoardVauleType) => {
  const response = await axiosInstance.post<DashBoardType>('/dashboards', data)
  return response.data
}
