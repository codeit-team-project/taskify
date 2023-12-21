import axios, { AxiosRequestConfig } from 'axios'
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTYsInRlYW1JZCI6IjEtMiIsImlhdCI6MTcwMzExODM1MCwiaXNzIjoic3AtdGFza2lmeSJ9.9vkx2ab2XtY63Tuu9JJsUrrdnGAul-ihy3qPw3RV0vI'

const axiosConfig: AxiosRequestConfig = {
  baseURL: 'https://sp-taskify-api.vercel.app/',
}
const axiosInstance = axios.create(axiosConfig)

axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`

export default axiosInstance
