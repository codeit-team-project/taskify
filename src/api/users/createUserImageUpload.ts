import axiosInstance from '@/commons/lib/axiosInstance'
// import { UserImageUploadValueType } from '@/types/users'

interface CreateUserImageUploadType {
  profileImageUrl: FormData
}

export const createUserImageUpload = async (data: CreateUserImageUploadType) => {
  const response = await axiosInstance.post('/users/me/image', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data
}
