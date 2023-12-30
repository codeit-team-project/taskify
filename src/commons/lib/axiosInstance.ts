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

axiosInstance.interceptors.response.use((response) => {
  return response
})

export default axiosInstance
