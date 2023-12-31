import '@/styles/reset.scss'
import '@/styles/globals.scss'
import type { AppProps } from 'next/app'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { CookiesProvider } from 'react-cookie'
import { useEffect } from 'react'

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    console.log('useEffect 호출 1')
    return () => console.log('use Return문 호출')
  }, [])
  return (
    <QueryClientProvider client={queryClient}>
      <CookiesProvider>
        <Component {...pageProps} />
      </CookiesProvider>
    </QueryClientProvider>
  )
}
