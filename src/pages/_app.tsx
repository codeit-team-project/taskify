import '@/styles/reset.scss'
import '@/styles/globals.scss'
import type { AppProps } from 'next/app'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { CookiesProvider } from 'react-cookie'
import { useRouter } from 'next/router'
import { getCookie } from '@/utils/cookie'
import { useCallback, useEffect } from 'react'

const queryClient = new QueryClient()

const DENIED_FOR_USER = ['/', '/signin', '/signup']

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const savedToken = getCookie('accessToken')

  const autoMove = useCallback(() => {
    if (savedToken) {
      if (DENIED_FOR_USER.includes(router.pathname)) {
        router.push('/mydashboard')
        return
      }
    } else {
      if (!DENIED_FOR_USER.includes(router.pathname)) {
        alert('로그인이 필요합니다!')
        router.push('/signin')
        return
      }
    }
  }, [router, savedToken])

  useEffect(() => {
    autoMove()
  }, [autoMove])

  return (
    <QueryClientProvider client={queryClient}>
      <CookiesProvider>
        <Component {...pageProps} />
      </CookiesProvider>
    </QueryClientProvider>
  )
}
