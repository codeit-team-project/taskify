import axiosInstance from '@/commons/lib/axiosInstance'
import { LoginType, SignInFormValueType } from '@/types/auth'

interface CreateLoginType {
  data: SignInFormValueType
}

export const createLogin = async ({ data }: CreateLoginType) => {
  const response = await axiosInstance.post<LoginType>('/auth/login', data)
  return response.data
}
