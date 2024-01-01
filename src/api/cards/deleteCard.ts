import axiosInstance from '@/commons/lib/axiosInstance'

// https://sp-taskify-api.vercel.app/1-2/cards/37

export const deleteCard = async (cardId: number) => {
  await axiosInstance.delete(`/cards/${cardId}`)
}
