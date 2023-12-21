import axios from 'axios'

const TEAM_URL = '1-02'
const token = ''

const axiosInstance = axios.create({
  baseURL: `https://sp-taskify-api.vercel.app/${TEAM_URL}`,
})

axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`

export default axiosInstance
