import axiosInstance from '@/commons/lib/axiosInstance'
import { CommentType } from '@/types/commentType'
export interface EditCommentType {
  commentId: number
  content: string
}
export const editComments = async ({ commentId, content }: EditCommentType) => {
  await axiosInstance.put<CommentType>(`/comments/${commentId}`, {
    content: content,
  })
}
