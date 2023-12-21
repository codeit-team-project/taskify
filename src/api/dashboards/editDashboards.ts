import axiosInstance from '@/commons/lib/axiosInstance'
import { DashBoardType, DashBoardVauleType } from '@/types/dashBoardType'

interface EditDashBoardType {
  dashBoardId: number
  data: DashBoardVauleType
}

export const editDashBoard = async ({ dashBoardId, data }: EditDashBoardType) => {
  const response = await axiosInstance.put<DashBoardType>(`/dashboards/${dashBoardId}`, data)
  return response.data
}
