/* signin 페이지에 사용할 Form 컴포넌트 

TODO - onSubmit에서 error 받을 때 alert 창 띄우는 코드를 모달창 띄우는 코드로 바꿀 것. (아님 토스트 메세지를 쓰던가 커스텀 alert를 써도 이쁠듯?)
TODO - isPending을 통해 로딩스피너 활용하는 코드 추가할 것. 
*/

import { AxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { useMutation } from '@tanstack/react-query'

import { createLogin } from '@/api/auth/createLogin'
import PasswordInput from '@/components/signInput/PasswordInput'
import TextInput from '@/components/signInput/TextInput'
import { SignInDataType } from '@/types/auth'
import { emailValidationRules, passwordValidationRules } from '@/utils/formInputValidationRules'

import styles from './SignForm.module.scss'
import { setCookie } from '@/utils/cookie'

export default function SigninForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<SignInDataType>({ mode: 'all' })
  const router = useRouter()
  const [isPending, setIsPending] = useState(false)

  const { mutate } = useMutation({
    mutationKey: ['create-login-key'],
    mutationFn: (data: SignInDataType) => createLogin({ data: data }),
    onMutate: () => {
      setIsPending(true)
    },
    onSuccess: (response) => {
      console.log('login succeed!')
      const accessToken = response?.data?.accessToken
      if (accessToken) {
        setCookie('savedToken', accessToken, {
          path: '/',
          secure: '/',
          sameSite: 'none',
        })
      }
      router.push('/mydashboard')
    },
    onError: (error: AxiosError) => {
      if (error?.response?.status === 400) {
        alert(`${error?.response?.data?.message}`)
      } else if (error?.response?.status === 404) {
        alert('존재하지 않는 유저입니다!')
      } else return
    },
    onSettled: () => {
      setIsPending(false)
    },
  })

  const onSubmit = () => {
    mutate({
      email: getValues('email'),
      password: getValues('password'),
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
      <button disabled={isPending} className={styles['submit-button']}>
        로그인
      </button>
    </form>
  )
}
