import { PropsWithChildren, createContext, useState } from 'react'

const SAVED_TOKEN = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null

interface AuthContextProps {
  token: string | null
  setToken: null | ((s: string) => void)
}

const INITIAL_AUTH_CONTEXT: AuthContextProps = {
  token: SAVED_TOKEN,
  setToken: null,
}

const AuthContext = createContext(INITIAL_AUTH_CONTEXT)

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [token, setToken] = useState(INITIAL_AUTH_CONTEXT.token ?? '')
  return (
    <AuthContext.Provider value={{ token: token, setToken: setToken }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
