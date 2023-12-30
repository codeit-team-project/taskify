import axiosInstance from '@/commons/lib/axiosInstance'

export const createUserImageUpload = async (data: FormData) => {
  const response = await axiosInstance.post('/users/me/image', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data
}
