import axiosInstance from '@/commons/lib/axiosInstance'
import { UserImageUploadValueType } from '@/types/users'

// interface CreateUserImageUploadType {
//   data: UserImageUploadValueType
// }

export const createUserImageUpload = async ({ profileImageUrl }: UserImageUploadValueType) => {
  const response = await axiosInstance.post('/users/me/image', {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: profileImageUrl,
  })
  return response.data
}
