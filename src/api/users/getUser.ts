import axiosInstance from '@/commons/lib/axiosInstance'
import { UserType } from '@/types/users'

export const getUser = async () => {
  const response = await axiosInstance.get<UserType>('users/me')
  return response.data
}
