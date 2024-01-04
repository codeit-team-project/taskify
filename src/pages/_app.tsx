import '@/styles/reset.scss'
import '@/styles/globals.scss'
import type { AppProps } from 'next/app'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { CookiesProvider } from 'react-cookie'
import { Toaster } from 'react-hot-toast'
import HeadMeta from '@/components/headMeta/HeadMeta'

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <CookiesProvider>
        <HeadMeta />
        <Toaster />
        <Component {...pageProps} />
      </CookiesProvider>
    </QueryClientProvider>
  )
}
