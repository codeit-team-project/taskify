import axiosInstance from '@/commons/lib/axiosInstance'

export const geteDashBoardsDetail = async (dashBoardId: number) => {
  const response = await axiosInstance.get(`/dashboards/${dashBoardId}`)
  return response.data
}
