import axiosInstance from '@/commons/lib/axiosInstance'

// page, size를 인자로 받아서 쿼리스트링을 만들 수 있습니다.

export const geteDashBoardInvitations = async (dashBoardId: number) => {
  const response = await axiosInstance.get(`/dashboards/${dashBoardId}/invitations`)
  return response.data
}
