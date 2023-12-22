import axiosInstance from '@/commons/lib/axiosInstance'

export const deleteColumn = async (columnId: number) => {
  await axiosInstance.delete(`/columns/${columnId}`)
}
