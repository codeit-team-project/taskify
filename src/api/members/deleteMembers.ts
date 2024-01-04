import axiosInstance from '@/commons/lib/axiosInstance'

export const deleteDashBoardMember = async (memberId: number) => {
  await axiosInstance.delete(`/members/${memberId}`)
}
