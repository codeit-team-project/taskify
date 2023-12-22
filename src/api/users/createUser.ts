import axiosInstance from '@/commons/lib/axiosInstance'
import { SignUpFormValueType, UserType } from '@/types/users'

interface CreateUserType {
  data: SignUpFormValueType
}

export const createUser = async ({ data }: CreateUserType) => {
  const response = await axiosInstance.post<UserType>('/users', data)
  return response.data
}
