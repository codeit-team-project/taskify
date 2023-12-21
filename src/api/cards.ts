import axiosInstance from '@/utils/axiosinstance'
const team: string = '1-2'

// 카드 만들기

export const createCard = async (data) => {
  await axiosInstance.post(`${team}/cards`, data)
}
