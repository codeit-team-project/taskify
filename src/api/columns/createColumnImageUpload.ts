import axiosInstance from '@/commons/lib/axiosInstance'

export interface CreateColumnImageUploadType {
  columnId: number
  data: FormData
}

export const createColumnImageUpload = async ({ columnId, data }: CreateColumnImageUploadType) => {
  const response = await axiosInstance.post(`/columns/${columnId}/card-image`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data
}
