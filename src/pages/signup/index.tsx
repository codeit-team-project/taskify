/* 회원가입 페이지

TODO - 나중에 되면 비밀번호 찾기 같은 것도 만들어볼 수 있지 않을까 가능하다면 해볼것.
*/

import { useRouter } from 'next/router'
import { useEffect } from 'react'

import SignLayout from '@/components/ui/layout/SignLayout'
import SignupForm from '@/components/signForm/SignupForm'
import useAuthContext from '@/hooks/useAuth'

export default function SignUpPage() {
  const { auth } = useAuthContext()
  const router = useRouter()

  useEffect(() => {
    console.log(auth)
    if (auth.user) {
      router.push('/dashboard')
    }
  }, [auth, router])

  return (
    <SignLayout isSignin={false}>
      <SignupForm />
    </SignLayout>
  )
}
