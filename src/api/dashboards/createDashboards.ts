import axiosInstance from '@/commons/lib/axiosInstance'
import { DashBoardType, DashBoardVauleType } from '@/types/dashBoardType'

export const createDashBoard = async ({ title, color }: DashBoardVauleType) => {
  const response = await axiosInstance.post<DashBoardType>('/dashboards', { title, color })
  return response.data
}
