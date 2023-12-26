import '@/styles/reset.scss'
import '@/styles/globals.scss'
import type { AppProps } from 'next/app'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { CookiesProvider } from 'react-cookie'
import { useRouter } from 'next/router'
import { getCookie } from '@/utils/cookie'
import { useEffect } from 'react'

const queryClient = new QueryClient()

const DENIED_FOR_USER = ['/', '/signin', '/signup']

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const savedToken = getCookie('accessToken')
  useEffect(() => {
    if (savedToken) {
      if (DENIED_FOR_USER.includes(router.pathname)) {
        router.push('/mydashboard')
      }
    }
  }, [router, savedToken])

  return (
    <CookiesProvider>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </CookiesProvider>
  )
}
