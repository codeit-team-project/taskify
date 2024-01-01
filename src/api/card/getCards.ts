import axiosInstance from '@/commons/lib/axiosInstance'
import { CardsType } from '@/types/cardsType'

export const getCards = async (columnId: number) => {
  const response = await axiosInstance.get<CardsType>(`/cards?size=10&columnId=${columnId}`)
  return response.data
}
