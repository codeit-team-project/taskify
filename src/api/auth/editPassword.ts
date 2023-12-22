import axiosInstance from '@/commons/lib/axiosInstance'
import { PasswordCheckVauleType } from '@/types/auth'

interface EditPasswordType {
  data: PasswordCheckVauleType
}

export const editPassword = async ({ data }: EditPasswordType) => {
  const response = await axiosInstance.put('auth/password', data)
  return response.data
}
