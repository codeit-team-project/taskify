import axiosInstance from '@/commons/lib/axiosInstance'
import { DashBoardType, DashBoardValueType } from '@/types/dashBoardType'

export const createDashBoard = async (data: DashBoardValueType) => {
  const response = await axiosInstance.post<DashBoardType>('/dashboards', data)
  return response.data
}
