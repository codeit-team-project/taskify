import '@/styles/reset.scss'
import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import { PropsWithChildren } from 'react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from '@/contexts/AuthContext'

function ProviderTags({ children }: PropsWithChildren) {
  const queryClient = new QueryClient()

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </AuthProvider>
  )
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ProviderTags>
      <Component {...pageProps} />
    </ProviderTags>
  )
}
