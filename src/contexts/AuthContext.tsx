import { PropsWithChildren, createContext, useState } from 'react'
import { LoginType } from '@/types/auth'

const NONE_USER: LoginType = {
  user: null,
  accessToken: null,
}

interface AuthContextProps {
  auth: LoginType
  setAuth: null | ((s: LoginType) => void)
}

const INITIAL_AUTH_CONTEXT: AuthContextProps = {
  auth: NONE_USER,
  setAuth: null,
}

const AuthContext = createContext(INITIAL_AUTH_CONTEXT)

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [auth, setAuth] = useState<LoginType>(NONE_USER)

  return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>
}

export default AuthContext
