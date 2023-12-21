import axiosInstance from '@/utils/axiosinstance'
const team: string = '1-2'

//sp-taskify-api.vercel.app/1-2/columns/91/card-image

export const createCardImage = async (columnId: number) => {
  const response = await axiosInstance.post(`${team}/columns/${columnId}/card-image`, {
    method: 'post',
  })
  return response.data
}
