import axiosInstance from '@/commons/lib/axiosInstance'
import { CardImageUploadValueType } from '@/types/columnsType'

interface CreateColumnImageUploadType {
  columnId: number
  data: CardImageUploadValueType
}

export const createColumnImageUpload = async ({ columnId, data }: CreateColumnImageUploadType) => {
  const response = await axiosInstance.post(`/columns/${columnId}/card-image`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data
}
