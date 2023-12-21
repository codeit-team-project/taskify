import axios from 'axios'

const TEAM_URL = '1-02'
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDUsInRlYW1JZCI6IjEtMDIiLCJpYXQiOjE3MDMxMzE5MzEsImlzcyI6InNwLXRhc2tpZnkifQ.AycKYBjDP_uDOnz6PNBjSV4Q8OaZWat1jZcGrFP-Wvg'

const axiosInstance = axios.create({
  baseURL: `https://sp-taskify-api.vercel.app/${TEAM_URL}`,
})

axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`

// axiosInstance.interceptors.request.use(
//   (config) => {
//     config.headers['Authorization'] = localStorage.getItem('accessToken')
//     return config
//   },
//   (err) => {
//     return Promise.reject(err)
//   },
// )

export default axiosInstance
