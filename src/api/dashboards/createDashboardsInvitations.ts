import axiosInstance from '@/commons/lib/axiosInstance'

// 나중에 타입에 대한 확실한 정의 필요
interface CreateInvitations {
  id: number
  data: {
    email: string
  }
}

export const createDashBoardInvitations = async ({ id, data }: CreateInvitations) => {
  const response = await axiosInstance.post(`/dashboards/${id}/invitations`, data)
  return response.data
}
