/* 인증 확인을 위한 hoc 함수

pages.tsx 함수를 인자로 받아 사용함.
*/

import { getCookie } from '@/utils/cookie'

import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const withAuth = (Component: NextPage) => {
  const AuthenticatedComponent = () => {
    const router = useRouter()

    const savedToken = getCookie('accessToken')

    // router.push 코드 때문에 CSR로 구현
    useEffect(() => {
      if (!savedToken) {
        alert('로그인 필수!')
        router.push('/signin')
      }
      return
    }, [savedToken, router])

    return !!savedToken ? <Component /> : null
  }

  return AuthenticatedComponent
}

export default withAuth
