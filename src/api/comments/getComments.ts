import axiosInstance from '@/commons/lib/axiosInstance'
import { getCommentsType } from '@/types/commentType'

export const getComments = async (cardId: number, pageParam?: number | null) => {
  const response = await axiosInstance.get<getCommentsType>(
    `comments?size=3${pageParam ? `&cursorId=${pageParam}` : ''}&cardId=${cardId}`,
  )
  return response.data
}
