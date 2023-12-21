import axiosInstance from '@/utils/axiosinstance'
const team: string = '1-2'

// 대시보드 멤버조회
//https://sp-taskify-api.vercel.app/1-2/members?page=1&size=20&dashboardId=27

export const getMembers = async (dashboardId: number) => {
  const response = await axiosInstance.get(
    `${team}/members?page=1&size=20&dashboardId=${dashboardId}`,
    {
      method: 'get',
    },
  )
  return response.data
}
