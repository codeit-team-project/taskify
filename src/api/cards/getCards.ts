import axiosInstance from '@/commons/lib/axiosInstance'
import { getCardsType } from '@/types/cardsType'

export const getCards = async (columnId: number) => {
  const response = await axiosInstance.get<getCardsType>(`/cards?size=50&columnId=${columnId}`)
  return response.data
}
