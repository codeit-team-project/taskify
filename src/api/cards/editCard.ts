import axiosInstance from '@/commons/lib/axiosInstance'
import { CardType } from '@/types/cardsType'

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
