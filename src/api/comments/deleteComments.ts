import axiosInstance from '@/commons/lib/axiosInstance'

export const deleteComments = async (commentId: number) => {
  await axiosInstance.delete(`/comments/${commentId}`)
}
