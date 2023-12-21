import axiosInstance from '@/commons/lib/axiosInstance'

// infiniteScroll 방식과 pagination 방식 중 하나를 선택해서 사용할 수 있습니다.
// 실제 해당 api 사용하실때 수정해서 사용해주세요.

export const geteDashBoardsList = async () => {
  const response = await axiosInstance.get('/dashboards?navigationMethod=pagination')
  return response.data
}
