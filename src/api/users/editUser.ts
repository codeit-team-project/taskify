import axiosInstance from '@/commons/lib/axiosInstance'
import { UserType } from '@/types/users'

interface EditUserType {
  data: Pick<UserType, 'nickname' | 'profileImageUrl'>
}

export const editUser = async ({ data }: EditUserType) => {
  const response = await axiosInstance.put<UserType>('users/me', data)
  return response.data
}
