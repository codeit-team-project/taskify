import axiosInstance from '@/commons/lib/axiosInstance'
import { UserType } from '@/types/users'
import { SignUpDataType } from '@/types/auth'

interface CreateUserType {
  data: SignUpDataType
}

export const createUser = async ({ data }: CreateUserType) => {
  const response = await axiosInstance.post<UserType>('/users', data, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return response
}
