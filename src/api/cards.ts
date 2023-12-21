import axiosInstance from '@/utils/axiosinstance'
const team: string = '1-2'

// 카드 만들기

export const createCard = async () => {
  const response = await axiosInstance.post(`${team}/cards`, {
    method: 'post',
  })
  return response.data
}
