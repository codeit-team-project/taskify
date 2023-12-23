/* signin 페이지에 사용할 Form 컴포넌트 

TODO - 시간 난다면 request 받는 중에 isPending 값을 true로 두고, 
      isPending 이 true일 때엔 spinner.gif를 띄우고 버튼 disabled로 상태 바꾸다가
      response를 받으면 spinner.gif 사라지게 하면서 다시 버튼 활상화 시키는 코드를 짜볼 것...
TODO - onSubmit 함수에서 error response 받을 때 alert 창 띄우는 코드를 나중에 모달창 띄우는 코드로 바꿀 것. (아님 토스트 메세지를 쓰던가 커스텀 alert를 써도 이쁠듯?)
*/

import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'

import { createLogin } from '@/api/auth/createLogin'
import PasswordInput from '@/components/signInput/PasswordInput'
import TextInput from '@/components/signInput/TextInput'
import { SignInFormValueType } from '@/types/auth'
import { emailValidationRules, passwordValidationRules } from '@/utils/formInputValidationRules'

import styles from './SignForm.module.scss'
import useAuthContext from '@/hooks/useAuth'

export default function SigninForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<SignInFormValueType>({ mode: 'all' })
  const router = useRouter()
  const { auth, setAuth } = useAuthContext()

  const onSubmit = () => {
    createLogin({
      data: {
        email: getValues('email'),
        password: getValues('password'),
      },
    })
      .then((response) => {
        if (response.status < 300 && response.status >= 200) {
          // TODO access token 저장해서 context로 뿌리는 코드.
          const loginUser = {
            user: response?.data?.user,
            accessToken: response?.data?.accessToken,
          }
          if (setAuth) {
            setAuth(loginUser)
            console.log(auth)
          }
          router.push('/dashboard')
        }
      })
      .catch((e) => {
        if (e.response.status === 400) {
          alert(`${e.response.data.message}`)
        } else if (e.response.status === 404) {
          alert('존재하지 않는 유저입니다!')
        } else return
      })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles['signinput-container']}>
        <TextInput
          placeholder="이메일을 입력해 주세요."
          labelName="이메일"
          {...register('email', emailValidationRules)}
          hasError={errors}
        />
        {errors.email && (
          <div className={styles['error-message']} role="alert">
            {errors.email.message}
          </div>
        )}
      </div>

      <div className={styles['signinput-container']}>
        <PasswordInput
          placeholder="비밀번호를 입력해 주세요."
          labelName="비밀번호"
          {...register('password', passwordValidationRules)}
          hasError={errors}
        />
        {errors.password && (
          <div className={styles['error-message']} role="alert">
            {errors.password.message}
          </div>
        )}
      </div>
      <button className={styles['submit-button']}>로그인</button>
    </form>
  )
}
