import axiosInstance from '@/commons/lib/axiosInstance'
import { CardType } from '@/types/cardsType'

export const getCardDetail = async (cardId: number) => {
  const response = await axiosInstance.get<CardType>(`/cards/${cardId}`)
  return response.data
}
