/* 로그인 페이지*/

import SignLayout from '@/components/ui/layout/SignLayout'
import SigninForm from '@/components/signForm/SigninForm'

export default function SignInPage() {
  return (
    <SignLayout isSignin={true}>
      <SigninForm />
    </SignLayout>
  )
}
