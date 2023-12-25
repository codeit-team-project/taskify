import axiosInstance from '@/commons/lib/axiosInstance'
import { LoginType, SignInDataType } from '@/types/auth'

interface CreateLoginType {
  data: SignInDataType
}

export const createLogin = async ({ data }: CreateLoginType) => {
  const response = await axiosInstance.post<LoginType>('/auth/login', data)
  return response
}
