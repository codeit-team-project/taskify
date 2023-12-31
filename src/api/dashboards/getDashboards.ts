import axiosInstance from '@/commons/lib/axiosInstance'
import { DashBoardListType } from '@/types/dashBoardType'

// infiniteScroll 방식과 pagination 방식 중 하나를 선택해서 사용할 수 있습니다.

export const getDashBoardList = async (currentPage?: number, size?: number) => {
  const query = `${currentPage ? `&page=${currentPage}` : ''}${size ? `&size=${size}` : ''}`

  const response = await axiosInstance.get<DashBoardListType>(
    `/dashboards?navigationMethod=pagination${query}`,
  )
  return response.data
}
