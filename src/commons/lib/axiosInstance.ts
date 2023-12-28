import axios from 'axios'
import { getCookie } from '@/utils/cookie'
const TEAM_URL = '1-02'

const axiosInstance = axios.create({
  baseURL: `https://sp-taskify-api.vercel.app/${TEAM_URL}`,
})

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = getCookie('accessToken')
    config.headers['Authorization'] = `Bearer ${accessToken}`
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    if (typeof window !== 'undefined') {
      switch (error?.response?.status) {
        // 401 에러 response를 받으면 signin 페이지로 이동
        case 401:
          alert('로그인이 필요합니다!')
          window.location.href = '/signin'
          return new Promise(() => {})
        // 404 에러 response를 받으면 404 페이지로 이동
        case 404:
          window.location.href = '/404'
          return new Promise(() => {})
      }
    }
    return error
  },
)

export default axiosInstance
