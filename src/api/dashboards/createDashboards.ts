import axiosInstance from '@/commons/lib/axiosInstance'

// 나중에 이 타입은 types로 옮겨야 함
interface DashBoard {
  title: string
  color: string
}

export const createDashBoard = async ({ title, color }: DashBoard) => {
  const response = await axiosInstance.post('/dashboards', { title, color })
  return response.data
}
