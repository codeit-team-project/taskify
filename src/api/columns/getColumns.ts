import axiosInstance from '@/commons/lib/axiosInstance'
import { ColumnsType } from '@/types/columnsType'

export const getColumns = async (dashboardId: number) => {
  const response = await axiosInstance.get<ColumnsType>(`/columns?dashboardId=${dashboardId}`)
  return response.data
}
