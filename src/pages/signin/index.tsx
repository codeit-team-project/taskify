/* 로그인 페이지

TODO - interceptor 로직 짤 때 로그인 상태에서 signin 페이지 접근 시 리다이렉트하는 기능 넣을 것.
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
