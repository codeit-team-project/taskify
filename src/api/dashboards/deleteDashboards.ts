import axiosInstance from '@/commons/lib/axiosInstance'

export const deleteDashBoard = async (dashBoardId: number) => {
  await axiosInstance.delete(`/dashboards/${dashBoardId}`)
}
