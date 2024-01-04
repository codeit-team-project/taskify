import axiosInstance from '@/commons/lib/axiosInstance'
import { ColumnType, ColumnValueType } from '@/types/columnsType'

export const createColumn = async ({ title, dashboardId }: ColumnValueType) => {
  const response = await axiosInstance.post<ColumnType>('/columns', { title, dashboardId })
  return response.data
}
