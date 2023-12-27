/*userContext

- 유저 정보를 전역적으로 관리하기 위해 만든 context value
- state나 context는 메모리에 일시적으로 저장되는 값이기 때문에 user 정보를 저장하기 위해 localStorage 활용
*/

import { createContext, PropsWithChildren, useState } from 'react'
import { UserType } from '@/types/users'
import { getCookie, removeCookie, setCookie } from '@/utils/cookie'

interface UserContextProps {
  user: UserType | null
  handleUserDataSave: any
  handleUserDataDiscard: any
}
export const UserContext = createContext<UserContextProps>({
  user: null,
  handleUserDataSave: () => {},
  handleUserDataDiscard: () => {},
})

export function UserContextProvider({ children }: PropsWithChildren) {
  const savedUser = getCookie('user')
  const [user, setUser] = useState<UserType | null>(savedUser)

  // 브라우저 cookie에 user 데이터를 저장하는 메소드
  // 로그인 시 실행될 메소드
  const handleUserDataSave = (data: UserType) => {
    if (typeof window !== 'undefined') {
      setCookie('user', JSON.stringify(data))
      const savedData = getCookie('user')
      setUser(() => {
        return { ...savedData }
      })
    }
  }

  // 브라우저 cookie의 user 데이터를 삭제하는 메소드
  // 로그아웃 시 실행될 메소드
  const handleUserDataDiscard = () => {
    if (typeof window !== 'undefined') {
      removeCookie('user')
      setUser(null)
    }
  }

  return (
    <UserContext.Provider value={{ user, handleUserDataSave, handleUserDataDiscard }}>
      {children}
    </UserContext.Provider>
  )
}
