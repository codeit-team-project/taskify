/* 인증 확인을 위한 hoc 함수

pages.tsx 함수를 인자로 받아 사용함.
*/

import { getCookie } from '@/utils/cookie'

import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const withAuth = (Component: NextPage) => {
  const AuthenticatedComponent = () => {
    const router = useRouter()

    const savedToken = getCookie('accessToken')
    const [isAuth, setIsAuth] = useState(false)

    useEffect(() => {
      if (!savedToken) {
        alert('로그인 필수!')
        router.push('/signin')
        return
      } else {
        setIsAuth(true)
      }
    }, [savedToken, router])

    return !!isAuth ? <Component /> : null // Render whatever you want while the authentication occurs
  }

  return AuthenticatedComponent
}

export default withAuth
