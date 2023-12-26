import axios from 'axios'
import { getCookie } from '@/utils/cookie'
const TEAM_URL = '1-02'

const accessToken = getCookie('savedToken')

const axiosInstance = axios.create({
  baseURL: `https://sp-taskify-api.vercel.app/${TEAM_URL}`,
})

axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`

export default axiosInstance
