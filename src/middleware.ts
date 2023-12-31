import { getCookie } from '@/utils/cookie'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  // 요청 헤더에서 로그인 여부를 확인할 수 있도록 쿠키에 접근
  const jwt = getCookie('accessToken')

  // 로그인 상태가 아니면 Redirection
  if (!jwt) {
    return NextResponse.redirect(new URL(`/signin`, request.url))
  }

  // 로그인 상태면 원래 요청한 경로로 이동한다.
  return NextResponse.next()
}

//
export const config = {
  matcher: ['/my', '/mydashboard', '/dashboard/:path*', '/dashboard'],
}
