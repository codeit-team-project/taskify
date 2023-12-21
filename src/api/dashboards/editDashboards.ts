import axiosInstance from '@/commons/lib/axiosInstance'

// 나중에 이 타입은 types로 옮겨야 함
interface DashBoard {
  title: string
  color: string
}

export const editDashBoard = async (dashBoardId: number, data: DashBoard) => {
  const response = await axiosInstance.put(`/dashboards/${dashBoardId}`, data)
  return response.data
}
