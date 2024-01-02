import axiosInstance from '@/commons/lib/axiosInstance'
import { CommentType } from '@/types/commentType'
export interface CreateCommentType {
  content: string
  cardId: number
  columnId: number
  dashboardId: number
}

export const createComments = async ({
  content,
  cardId,
  columnId,
  dashboardId,
}: CreateCommentType) => {
  await axiosInstance.post<CommentType>('/comments', {
    content: content,
    cardId: cardId,
    columnId: columnId,
    dashboardId: dashboardId,
  })
}
