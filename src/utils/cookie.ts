import { Cookies } from 'react-cookie'

const cookies = new Cookies()

// 기본적으로 6000초가 지나면 모든 cookie들은 알아서 자동 삭제됨.
export const setCookie = (name: string, value: string) => {
  return cookies.set(name, value, {
    path: '/',
    secure: true,
    maxAge: 6000,
  })
}

export const getCookie = (name: string) => {
  return cookies.get(name)
}

export const removeCookie = (name: string) => {
  return cookies.remove(name, { path: '/' })
}
