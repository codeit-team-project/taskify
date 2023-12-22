import axiosInstance from '@/commons/lib/axiosInstance'
import { ColumnType, ColumnValueType } from '@/types/columnsType'

interface EditColumnType {
  columnId: number
  data: Pick<ColumnValueType, 'title'>
}

export const editColumn = async ({ columnId, data }: EditColumnType) => {
  const response = await axiosInstance.put<ColumnType>(`/columns/${columnId}`, data)
  return response.data
}
