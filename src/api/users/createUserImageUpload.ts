import axiosInstance from '@/commons/lib/axiosInstance'
import { UserImageUploadValueType } from '@/types/users'

// interface CreateUserImageUploadType {
//   data: UserImageUploadValueType
// }

// export const createUserImageUpload = async ({ data }: CreateUserImageUploadType) => {
//   const response = await axiosInstance.post('/users/me/image', data, {
//     headers: {
//       'Content-Type': 'multipart/form-data',
//     },
//   })
//   return response.data
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
