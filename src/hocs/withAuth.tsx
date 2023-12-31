/* 인증 확인을 위한 hoc 함수

- 인증이 필요한 페이지에 접근했는데 accessToken이 없을 경우 alert 창을 띄우면서 signin 페이지로 리다이렉트
- pages.tsx 함수를 인자로 받아 사용함.
*/

import { getCookie } from '@/utils/cookie'

import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const AUTHENTICATED_PATH = ['/my', '/mydashboard', '/dashboard', '/dashboard/*']

const withAuth = (Component: NextPage) => {
  const AuthenticatedComponent = () => {
    const router = useRouter()
    const pathName = router.pathname
    const savedToken = getCookie('accessToken')

    useEffect(() => {
      if (!savedToken && AUTHENTICATED_PATH.includes(pathName)) {
        alert('로그인이 필요합니다!')
        router.push('/signin')
      } else if (savedToken && !AUTHENTICATED_PATH.includes(pathName)) {
        router.push('/mydashboard')
      }
      return
    }, [savedToken, router, pathName])

    return <Component />
  }

  return AuthenticatedComponent
}

export default withAuth
