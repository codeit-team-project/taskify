import axiosInstance from '@/commons/lib/axiosInstance'

export const deleteCard = async (cardId: number) => {
  await axiosInstance.delete(`/cards/${cardId}`)
}
