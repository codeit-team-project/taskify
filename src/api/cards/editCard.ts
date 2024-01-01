import axiosInstance from '@/commons/lib/axiosInstance'
import { CardType } from '@/types/cardsType'

//sp-taskify-api.vercel.app/1-2/cards/43
export interface editCardType {
  assigneeUserId: number
  title: string
  description: string
  dueDate: string
  tags: string[]
  imageUrl: string
}

export const editCard = async (cardId: number, data: editCardType) => {
  const response = await axiosInstance.put<CardType>(`/cards/${cardId}`, data)
  return response.data
}
