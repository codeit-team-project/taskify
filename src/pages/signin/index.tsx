/* 로그인 페이지

TODO - 나중에 되면 비밀번호 찾기 같은 것도 만들어볼 수 있지 않을까 가능하다면 해볼것.
*/

import SignLayout from '@/components/ui/layout/SignLayout'
import SigninForm from '@/components/signForm/SigninForm'

export default function SignInPage() {
  return (
    <SignLayout isSignin={true}>
      <SigninForm />
    </SignLayout>
  )
}
